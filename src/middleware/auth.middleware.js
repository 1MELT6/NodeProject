const service = require('../services/user.service')
const errorType = require('../constants/error-types')
const md5password = require('../utils/password-handle')

const verifyLogin = async(ctx,next)=>{  console.log("验证登录的middleware~");
    //1、获取用户密码
    const {name,password} = ctx.request.body
    // 2、判断密码用户名为不为空
    if(!name||!password){
        const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)//要设置为常量 constant-error-types
        return ctx.app.emit('error',error,ctx)
    }

    // 3、判断用户是否存在
    // 数组返回的result还是数组 所以直接使用【0】
    // const result = await service.getUserByName(name)[0];
    const result = await service.getUserByName(name);
    const user = result[0]
     
    if(!user){
        const error = new Error(errorType.USER_DOES_NOT_EXISTS);
        return ctx.app.emit('error',error,ctx)
    }

    // 4、判断密码与数据库加密的是否一致
    if(md5password(password)!== user.password){
        const error = new Error(errorType.PASSWORD_IS_INCORRENT)
        return ctx.app.emit('error',error,ctx)
    }
    
     await next()
}

module.exports = {verifyLogin}