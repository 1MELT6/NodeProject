const Router = require('koa-router')
const {create} = require('../controller/user.controller')

const userRouter = new Router({prefix:'/users'})
// restful风格，创建用户要用post请求
userRouter.post('/',create
// ,(ctx,next)=>{
//     ctx.body = "创建用户成功"
// }
// 具体逻辑放到controller里
)

module.exports = userRouter