// 用户注册接口
//路径一： 请求路径与映射（Koa不能直接app.get 需要使用第三方库koa-router）

const Koa = require('koa')

const bodyParser = require('koa-parser')

const app = new Koa()

app.use(bodyParser())
const userRouter = require('../router/user.router')

// 路由相关抽离
// const Router = require('koa-router')

// const app = new Koa()

// const userRouter = new Router({prefix:'/user'})
// // restful风格，创建用户要用post请求
// userRouter.post('/',(ctx,next)=>{
//     ctx.body = "创建用户成功"
// })

app.use(userRouter.routes())
app.use(userRouter.allowedMethods())


module.exports = app