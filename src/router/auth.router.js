const Router = require('koa-router')

const authRouter = new Router();

const { login, success } = require('../controller/auth.controller')
const { verifyLogin, verifyAuth } = require('../middleware/auth.middleware')

// 路径到请求中间是中间件 而login是一个函数 ，
// 个人理解：所以在controller是login(ctx,next)
// 而中间是直接（ctx,next)
// 验证登录
authRouter.post('/login', verifyLogin, login)
// 登录成功领取系统颁发检验token通行
authRouter.get('/test', verifyAuth, success)
module.exports = authRouter;