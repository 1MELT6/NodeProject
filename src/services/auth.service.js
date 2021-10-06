const connection = require('../app/database')

class AuthService {
    async checkMoment(momentId, userId) {

        //按输入的网址动态id 和后台登陆用户的id 与此条动态的id和用户id进行对比
        const statement = `SELECT * FROM moment WHERE id = ? AND user_id = ?`
        const [result] = await connection.execute(statement, [momentId, userId])
        // console.log(result);
        return result.length === 0 ? false : true


    }
}

module.exports = new AuthService()