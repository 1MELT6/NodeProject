const service = require('../services/comment.service')

class CommentController{
    async create(ctx,next){
        const {momentId,content} = ctx.request.body
        const {id} = ctx.user
        const result = await service.create(momentId,content,id)
        ctx.body = result
    }
    async reply(ctx,next){
        const {commentId} = ctx.params
        const {momentId,content} = ctx.request.body
        const {id} = ctx.user
        const result = await service.reply(momentId,content,id,commentId)
        ctx.body = result
    }
}

module.exports = new CommentController()