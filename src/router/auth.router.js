const Router = require('koa-router')

const authRouter = new Router();

const {login} = require('../controller/auth.controller')
const {verifyLogin} = require('../middleware/auth.middleware')

// 路径到请求中间是中间件 而login是一个函数 ，
// 个人理解：所以在controller是login(ctx,next)
// 而中间是直接（ctx,next)
authRouter.post('/login',verifyLogin,login)

module.exports = authRouter;