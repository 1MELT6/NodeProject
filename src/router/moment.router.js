const Router = require('koa-router')

const momentRouter = new Router({
    prefix: '/moment'
})

const { verifyAuth } = require('../middleware/auth.middleware')
const { create,detail,list } = require('../controller/moment.controller')
momentRouter.post('/', verifyAuth, create)//发布动态
momentRouter.get('/:momentId',detail)//获取单条查询操作
momentRouter.get('/',list)//获取列表查询操作

module.exports = momentRouter