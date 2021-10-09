const  service  = require('../services/label.service')

class LabelController {

    async create(ctx, next) {
        const { name } = ctx.request.body
        const result = await service.create(name)
        ctx.body = result
    }

    async list(ctx,next){
        const {limit,offset} = ctx.query;
        // console.log(limit,offset);
        const result = await service.getLabels(limit,offset)
        ctx.body =  result
    }
}

module.exports = new LabelController()