const jwt = require('jsonwebtoken')
const {PRIVATE_KEY}= require('../app/config')

class AuthController {
    async login(ctx,next){
       
        const {id,name} = ctx.user
        // const {name} = ctx.request.body;
        const token = jwt.sign({id,name},PRIVATE_KEY,{
            expiresIn:60 * 60 *24,
            algorithm:'RS256'
        })

        // ctx.body = `登陆成功，欢迎${name}回来！！`
        ctx.body={ id,name,token  }
    }
}

module.exports = new AuthController();