const Router = require('koa-router')

const commentRouter = new Router({prefix:'/comment'})

const {create,reply,update,remove,list} = require('../controller/comment.controller')
const {verifyAuth, verifyPermission} = require('../middleware/auth.middleware')

commentRouter.post('/',verifyAuth,create)
commentRouter.post('/:commentId/reply',verifyAuth,reply)

// commentRouter.patch('/:commentId/update')//误区
commentRouter.patch('/:commentId',verifyAuth,verifyPermission, update)
commentRouter.delete('/:commentId',verifyAuth,verifyPermission, remove)

// 动态获取评论列表
commentRouter.get('/',list)

module.exports = commentRouter