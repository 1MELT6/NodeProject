const dotenv = require('dotenv')

dotenv.config()
// 调用后此时APP_PORT就存在里面了
// console.log(process.env.APP_PORT);

// const {APP_PORT} = process.env

module.exports = {
    APP_PORT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
} = process.env