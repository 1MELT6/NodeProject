// 使用函数比类方便
const verifyUser = async (ctx, next) => {
    //   1获取用户和密码
    const {name,password} = ctx.request.body
    console.log(name,password);
    // 2判断用户名或者密码不能为空
    if(!name||!password||name===" "||password===" "){
        const error = new Error('用户名和密码不能为空喔')
        return ctx.app.emit('error',error,ctx)
        // 有发送就有监听 index.js app.on
    }
    //3判断注册用户名有没有注册过

    await next()
}

module.exports = {
    verifyUser
}