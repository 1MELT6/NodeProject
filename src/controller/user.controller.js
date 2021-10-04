const service = require('../services/user.service')

class UserControll{
    async create(ctx,next){
        // 获取用户请求传递的参数 json数据解析koa-bodyparser/parser也可以
        const user = ctx.request.body
        // 查询数据(抽取到业务->service)
      const result = await  service.create(user)
        // 返回数据
        ctx.body = result
    }
}

module.exports = new UserControll()