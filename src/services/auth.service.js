const connection = require('../app/database')

class AuthService {
    
    // async checkMoment(momentId, userId) {
    //     //按输入的网址动态id 和后台登陆用户的id 与此条动态的id和用户id进行对比
    //     const statement = `SELECT * FROM moment WHERE id = ? AND user_id = ?`
    //     const [result] = await connection.execute(statement, [momentId, userId])
    //     // console.log(result);
    //     return result.length === 0 ? false : true
    // }

    //    不仅可以评论鉴权也可以标签文件鉴权全部统一，sql语句不固定
    
        async checkResource(tableName, id, userId) {
          const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`;
          const [result] = await connection.execute(statement, [id, userId]);
          return result.length === 0 ? false: true;
        }
      
}

module.exports = new AuthService()