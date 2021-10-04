const mysql = require('mysql2')
// const config = require('./config');
// 下面直接config.MYSQL_HOST 这样引用
const { MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD } = require('./config')
// const connection = mysql.createPool({
//     host: config.MYSQL_HOST,
//     port: config.MYSQL_PORT,
//     database: config.MYSQL_DATABASE,
//     user: config.MYSQL_USER,
//     password: config.MYSQL_PASSWORD
// })
// 密码相关-<.env
const connection = mysql.createPool({
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD
})

connection.getConnection((err, conn) => {
    conn.connect((err) => {
        if (err) {
            console.log("连接失败:", err);
        } else {
            console.log("数据库连接成功~");
        }
    })
});

// 操作数据库时用promise操作
module.exports = connection.promise()