const connection = require('../app/database')

class UserService {
    async create(user) {

        const {name,password} = user;

        const statement = `INSERT INTO user (name,password) VALUES (?, ?);`

        const result = await connection.execute(statement,[name,password])
        //将user存储到数据库中
        // console.log("将用户数据保存到数据库",user);
        return result
        // return "创建用户成功"
    }
}

module.exports = new UserService()