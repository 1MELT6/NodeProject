const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')
dotenv.config()
// 调用后此时APP_PORT就存在里面了
// console.log(process.env.APP_PORT);

// const {APP_PORT} = process.env

// 终端要在当前目录 不能越过上一级，以防万一使用绝对路径
// const PRIVATE_KEY = fs.readFileSync('src/app/keys/private'); 
// dirname 获取当前文件所在文件夹 拼接后就是绝对路径
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'));

module.exports = {
    APP_PORT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
} = process.env

module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;