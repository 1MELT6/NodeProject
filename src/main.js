const app =  require('./app/index')
const config = require('./app/config')
// 在这里使用中间件会显得复杂 所以添加app/index.js进行编写
// 这里的app不用解构 因为本来就是本身，不是函数类之类的

// const  connection =require('./app/database')
require('./app/database')

// app.listen(8000,()=>{
app.listen(config.APP_PORT,()=>{
    console.log(`服务器在${config.APP_PORT} ${process.env.APP_PORT} 启动成功`);
})
// 端口号什么的不要写硬代码 只有技术总监才能看并且不能上传到git
// 所以要写到.env里
// 如何读进来与其用解析字符串之类的不如用一个npm库
//dotenv 根目录的配置文件直接加载到环境变量
// 由于是全局加载 所以在app里创建一个config.js
// 并且导入2