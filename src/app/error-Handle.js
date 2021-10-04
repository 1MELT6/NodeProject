const errorHandle = (error,ctx)=>{
    console.log(error.message);

    ctx.status = 404;
    ctx.body = "发生了错误了"
}

module.exports = errorHandle