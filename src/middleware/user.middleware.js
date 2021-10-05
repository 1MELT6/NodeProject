// 使用函数比类方便

const errorType = require('../constants/error-types')
const service = require('../services/user.service')
const md5password = require('../utils/password-handle')

const verifyUser = async (ctx, next) => {
    //   1获取用户和密码
    const {name,password} = ctx.request.body
    console.log(name,password);
    // 2判断用户名或者密码不能为空
    if(!name||!password||name===" "||password===" "){
        const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)//要设置为常量 constant-error-types
        // const error = new Error('用户名和密码不能为空喔')
        return ctx.app.emit('error',error,ctx)
        // 有发送就有监听 index.js app.on
    }
    //3判断注册用户名有没有注册过
    const result = await service.getUserByName(name);
    if(result.length){
        const error = new Error(errorType.NAME_IS_ALREADY_EXISTS);
        return ctx.app.emit('error',error,ctx)
    }

    await next()
}

const handlePassword = async (ctx,next)=>{
    const {password} = ctx.request.body;
    ctx.request.body.password = md5password(password)
    await next()
}

module.exports = {
    verifyUser,
    handlePassword
}