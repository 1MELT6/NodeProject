const connection = require('../app/database')

// 创建用户
class UserService {
    async create(user) {

        const { name, password } = user;

        const statement = `INSERT INTO user (name,password) VALUES (?, ?);`

        const result = await connection.execute(statement, [name, password])
        //将user存储到数据库中
        // console.log("将用户数据保存到数据库",user);
        return result;
        // return "创建用户成功"
    }
    // 查询用户名是否已存在
    async getUserByName(name) {
        const statement = `SELECT * FROM user WHERE name = ?;`;
        const result = await connection.execute(statement,[name]);
        // console.log(result);
        // [
        //     [
        //       BinaryRow {
        //         id: 9,
        //         name: 'helsl',
        //         password: '84642452',
        //         createAt: 2021-10-05T06:37:33.000Z,
        //         updateAt: 2021-10-05T06:37:33.000Z,
        //         avatar_url: null
        //       }
        //     ],
        //     [
        //       ColumnDefinition {
        //         _buf: <Buffer 01 00 00 01 06 28 00 00 02 03 64 65 66 06 63 68 61 65 6e 67 04 75 73 65 72 04 75 73 65 72 02 69 64 02 69 64 0c 3f 00 0b 00 00 00 03 03 42 00 00 00 2c ... 334 more bytes>,
        //         _clientEncoding: 'utf8',
        //         _catalogLength: 3,
        //         _catalogStart: 10,
        //         _schemaLength: 6,
        //         _schemaStart: 14,
        //         _tableLength: 4,
        //         _tableStart: 21,
        //         _orgTableLength: 4,
        //         _orgTableStart: 26,
        //         _orgNameLength: 2,
        //         _orgNameStart: 34,
        //         characterSet: 63,
        //         encoding: 'binary',
        //         name: 'id',
        //         columnLength: 11,
        //         columnType: 3,
        //         flags: 16899,
        //         decimals: 0
        //       },
        return result[0]
        // 只有0是结果后面是信息相关
    }
}



module.exports = new UserService()