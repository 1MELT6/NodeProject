const momentService = require('../services/moment.service');

class MomentController {
    async create(ctx, next) {
        // 1、获取数据（user_id,content）
        const userId = ctx.user.id
        const content = ctx.request.body.content

        // 2、将数据添加到数据库
        const result = await momentService.create(userId, content)
        ctx.body = result
    }

    async detail(ctx,next){
        // 1、获取数据（momentid）参数是param1 queryname=123&age=12 
        //  localhost/1?name=123&age=12
        const momentId = ctx.params.momentId
        // 2、根据id查询这条数据
        const result = await momentService.getMomentById(momentId)
        ctx.body = result
    }

    async detail(ctx,next){
        // 1、获取数据（momentid）参数是param moment queryname=123&age=12 
        //  localhost/moment?name=123&age=12
        const momentId = ctx.params.momentId
        // 2、根据id查询这条数据
        const result = await momentService.getMomentById(momentId)
        ctx.body = result
    }

    async list(ctx,next){
        const{offset,size} = ctx.query

        const result = await momentService.getMomentList(offset,size)
        ctx.body = result
    }
}
module.exports = new MomentController()