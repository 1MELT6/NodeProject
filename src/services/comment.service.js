const connection = require('../app/database')

class CommentService {
    async create(momentId, content, userId) {
        const statement = `INSERT INTO comment(content,moment_id,user_id) VALUE(?,?,?);`
        const [result] = await connection.execute(statement, [content, momentId, userId])
        return result
    }
    async reply(momentId, content, userId, commentId) {
        const statement = `INSERT INTO comment(content,moment_id,user_id,comment_id) VALUE(?,?,?,?);`
        const [result] = await connection.execute(statement, [content, momentId, userId, commentId])
        return result
    }
    async update(commentId, content) {
        const statement = `UPDATE comment SET content = ? WHERE id = ?`;
        const [result] = await connection.execute(statement, [content, commentId]);
        return result;
    }
    async remove(commentId) {
        const statement =  `DELETE FROM comment WHERE id = ?`;
        const [result] = await connection.execute(statement, [commentId]);
        return result;
    }
    // 两个接口分开设计，一个在moment查询单个，一个在comment以下这个接口
    async getCommentlistById(momentId) {
        const statement =  `SELECT * FROM comment WHERE moment_id = ?`;
        const [result] = await connection.execute(statement, [momentId]);
        return result;
    }
}
module.exports = new CommentService()