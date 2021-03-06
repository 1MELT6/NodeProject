const jwt = require('jsonwebtoken');

const service = require('../services/user.service')
const authService = require('../services/auth.service')
const errorType = require('../constants/error-types')
const md5password = require('../utils/password-handle');
const { PUBLIC_KEY } = require('../app/config');

const verifyLogin = async (ctx, next) => {
    console.log("验证登录的middleware~");
    //1、获取用户密码
    const { name, password } = ctx.request.body
    // 2、判断密码用户名为不为空
    if (!name || !password) {
        const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)//要设置为常量 constant-error-types
        return ctx.app.emit('error', error, ctx)
    }

    // 3、判断用户是否存在
    // 数组返回的result还是数组 所以直接使用【0】
    // const result = await service.getUserByName(name)[0];
    const result = await service.getUserByName(name);
    const user = result[0]

    if (!user) {
        const error = new Error(errorType.USER_DOES_NOT_EXISTS);
        return ctx.app.emit('error', error, ctx)
    }

    // 4、判断密码与数据库加密的是否一致
    if (md5password(password) !== user.password) {
        const error = new Error(errorType.PASSWORD_IS_INCORRENT)
        return ctx.app.emit('error', error, ctx)
    }
    ctx.user = user;
    await next()
}

const verifyAuth = async (ctx, next) => {
    console.log("验证授权的middleware");
    // authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsIm5hbWUiOiIxMiIsImlhdCI6MTYzMzQ0Nzg1OCwiZXhwIjoxNjMzNTM0MjU4fQ.y44B-XUoeu-ne7wmcF8Or9nveER_KSkGntkzIFREdjoreasWqsJvyy9ZOnYSYswGUDQjFjX0BnQSWgYI-LPO83Wlx6Nx2Ue52isxzKXaldJLVOJ2eWgL4lObF8L4e1m-b1lCG8Tho-wKFLRKu_PYxRJoeY7pNGpSsOPnIKHaU8g',
    // 1、获取token
    const authorization = ctx.headers.authorization;
    if (!authorization) {
        const error = new Error(errorType.UNAUTHORIZATION);
        return ctx.app.emit('error', error, ctx);
    }
    const token = authorization.replace('Bearer ', "")
    // 2、验证token(id/name/iat/exp)
    try {
        const result = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ["RS256"]
            //数组可以传多个
        })
        ctx.user = result
        await next()
    } catch (err) {
        const error = new Error(errorType.UNAUTHORIZATION)
        ctx.app.emit('error', error, ctx)

    }
}

const verifyPermission =
    async (ctx, next) => {
        console.log("验证权限的middleware~");
        // restful风格获取tablename  ctx.params=> {commentId:1}
        const [resouceKey] = Object.keys(ctx.params)
        // 1、获取参数
        const tableName = resouceKey.replace('Id','')
        // 拿到value
        const resourceId = ctx.params[resouceKey]
        const { id } = ctx.user
        // 2、查询是否具备权限
        try {
            // const isPermission = await authService.checkMoment(momentId, id)
            const isPermission = await authService.checkResource(tableName, resourceId, id)
            if (!isPermission)
                //   // {  const error = new Error(errorType.UNPERMISSON)
                //     return ctx.app.emit('error', error, ctx) // } 
                throw new Error()
            await next()
        } catch (err) {
            const error = new Error(errorType.UNPERMISSON)
            return ctx.app.emit('error', error, ctx)
        }

    }

// 闭包获取tablename
// const verifyPermission = (tableName) => {
// async (ctx, next) => {
//     console.log("验证权限的middleware~");
//     // 1、获取参数
//     const { momentId } = ctx.params
//     const { id } = ctx.user
//     // 2、查询是否具备权限
//     try {
//         // const isPermission = await authService.checkMoment(momentId, id)
//         const isPermission = await authService.checkResource(tableName, momentId, id)
//         if (!isPermission)
//             //   // {  const error = new Error(errorType.UNPERMISSON)
//             //     return ctx.app.emit('error', error, ctx) // } 
//             throw new Error()
//         await next()
//     } catch (err) {
//         const error = new Error(errorType.UNPERMISSON)
//         return ctx.app.emit('error', error, ctx)
//     }

// }
// }

// 原来没有tablename的时候 安装单个获取权限不是多个状态
// const verifyPermission =  
// async (ctx, next) => {
//     console.log("验证权限的middleware~");
//     // 1、获取参数
//     const { momentId } = ctx.params
//     const { id } = ctx.user
//     // 2、查询是否具备权限
//     try {
//         const isPermission = await authService.checkResource( momentId, id)
//         if (!isPermission)
//             //   // {  const error = new Error(errorType.UNPERMISSON)
//             //     return ctx.app.emit('error', error, ctx) // } 
//             throw new Error()
//         await next()
//     } catch (err) {
//         const error = new Error(errorType.UNPERMISSON)
//         return ctx.app.emit('error', error, ctx)
//     }
// }

module.exports = { verifyLogin, verifyAuth, verifyPermission }