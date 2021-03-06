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

    // 原本的不带查询评论的功能
    // async getMomentById(id) {
    //     // 要把id和name放在user对象里
    //     const statement = `SELECT
    //         m.id id, m.content content, m.createAt createTime, m.updateAt updateTime, 
    //         JSON_OBJECT('id', u.id, 'name', u.name) author
    //     FROM moment m
    //     LEFT JOIN user u ON m.user_id = u.id
    //     WHERE m.id = ?;
    //     `;
    //     // const statement = `SELECT * from moment WHERE id = ?;`
    //     const [result] = await connection.execute(statement, [id])
    //     return result[0]
    // }

    // 单独一个接口在这合并两个功能
    async getMomentById(id) {
        const statement = `
        SELECT
        m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,
				JSON_OBJECT('id', u.id, 'name', u.name) author,
        JSON_ARRAYAGG(
        JSON_OBJECT ( 'id', c.id, 'content', c.content, 'commentId' , c.comment_id,'createTime', c.createAt,
        'user' , JSON_OBJECT ( 'id' , cu.id, 'name' , cu.name) ))
				comments
        FROM moment m
        LEFT JOIN user u ON m.user_id = u.id
        LEFT JOIN comment c ON c.moment_id = m.id
        LEFT JOIN user cu ON c.user_id =cu.id WHERE m.id = ?;
        `;
        // const statement = `SELECT * from moment WHERE id = ?;`
        const [result] = await connection.execute(statement, [id])
        return result[0]
    }

    async getCommentsByMomentId(offset, size) {
        const statement = `SELECT
            m.id id, m.content content, m.createAt createTime,m.updateAt updateTime, 
            JSON_OBJECT('id', u.id, 'name', u.name) author,
            (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id)commentCount
        FROM moment m
        LEFT JOIN user u ON m.user_id = u.id
        LIMIT ?,?;
        `;
        // const statement = `${sqlFragment} LIMIT ?,?;`
        const [result] = await connection.execute(statement, [offset, size])
        return result
    }

    async update(content, momentId) {
        const statement = `UPDATE moment SET content = ? WHERE id =?;`
        const [result] = await connection.execute(statement, [content, momentId])
        return result
    }

}

module.exports = new MomentService