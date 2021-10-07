const Router = require('koa-router')

const commentRouter = new Router({prefix:'/comment'})

const {create,reply,update} = require('../controller/comment.controller')
const {verifyAuth} = require('../middleware/auth.middleware')

commentRouter.post('/',verifyAuth,create)
commentRouter.post('/:commentId/reply',verifyAuth,reply)

// commentRouter.patch('/:commentId/update')//误区
commentRouter.patch('/:commentId',verifyAuth, update)


module.exports = commentRouter