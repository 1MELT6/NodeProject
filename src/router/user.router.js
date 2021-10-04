const Router = require('koa-router')
const {create} = require('../controller/user.controller')
const { verifyUser}= require('../middleware/user.middleware')

const userRouter = new Router({prefix:'/users'})
// restful风格，创建用户要用post请求
// 判断用户是否为空或者重复verifyUser->middleware
// 这里的veryfy函数要加next才能执行create 中间件特性
userRouter.post('/',verifyUser,create
// ,(ctx,next)=>{
//     ctx.body = "创建用户成功"
// }
// 具体逻辑放到controller里
)

module.exports = userRouter