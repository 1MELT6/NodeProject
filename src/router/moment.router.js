const Router = require('koa-router')

const momentRouter = new Router({
    prefix: '/moment'
})

const { verifyAuth ,verifyPermission } = require('../middleware/auth.middleware')
const { create,detail,list,update } = require('../controller/moment.controller')
momentRouter.post('/', verifyAuth, create)//发布动态
momentRouter.get('/:momentId',detail)//获取单条查询操作
momentRouter.get('/',list)//获取列表查询操作
momentRouter.patch('/:momentId',verifyAuth,verifyPermission,update)
//修改动态 ，需要验证是否登录
// 还要验证是否只是修改本人的动态（权限）所以有两个中间件

module.exports = momentRouter