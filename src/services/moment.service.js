const connection = require('../app/database')

// const sqlFragment = `
//   SELECT 
//     m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
//     JSON_OBJECT('id', u.id, 'name', u.name) author
//   FROM moment m
//   LEFT JOIN user u ON m.user_id = u.id
// `


class MomentService {
    async create(userId, content) {
        const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`;
        const result = await connection.execute(statement, [content, userId])
        return result
    }
    async getMomentById(id) {
        // 要把id和name放在user对象里
        const statement = `SELECT
            m.id id, m.content content, m.createAt createTime, m.updateAt updateTime, 
            JSON_OBJECT('id', u.id, 'name', u.name) author
        FROM moment m
        LEFT JOIN user u ON m.user_id = u.id
        WHERE m.id = ?;
        `;
        // const statement = `SELECT * from moment WHERE id = ?;`
        const [result] = await connection.execute(statement,[id])
        return result[0]
    }

    async getMomentList(offset,size) {
        const statement = `SELECT
            m.id id, m.content content, m.createAt createTime,m.updateAt updateTime, 
            JSON_OBJECT('id', u.id, 'name', u.name) author
        FROM moment m
        LEFT JOIN user u ON m.user_id = u.id
        LIMIT ?,?;
        `;
        // const statement = `${sqlFragment} LIMIT ?,?;`
        const [result] = await connection.execute(statement,[offset,size])
        return result[0]
    }

}

module.exports = new MomentService