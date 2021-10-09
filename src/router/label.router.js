const Router = require('koa-router')



const { create,list} = require('../controller/label.controller')

const { verifyAuth } = require('../middleware/auth.middleware')

const {verifyLabelExists} = require('../middleware/lable.middleware')

const labelRouter = new Router({ prefix: '/label' })

labelRouter.post('/', verifyAuth, create)
labelRouter.get('/',list)
// labelRouter.post('/list', verifyAuth,verifyLabelExists, addLabels)//添加多个标签

module.exports = labelRouter