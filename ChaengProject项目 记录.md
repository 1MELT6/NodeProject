## **ChaengProject项目 记录**

### 1、项目框架搭建

- 目录结构创建（app：全局相关
- 初始化项目
- main.js  koa启动服务
- 安装nodemon 更改配置启动代码
- 启动服务 
- ![1633357673737](C:\Users\52949\AppData\Roaming\Typora\typora-user-images\1633357673737.png)

### 2、用户注册接口

![1633354600312](C:\Users\52949\AppData\Roaming\Typora\typora-user-images\1633354600312.png)

![1633355410671](C:\Users\52949\AppData\Roaming\Typora\typora-user-images\1633355410671.png)

![1633357071872](C:\Users\52949\AppData\Roaming\Typora\typora-user-images\1633357071872.png)





创建表user

下载第三方库mysql2

配置相关信息连接数据库

编写代码保存用户请求

![1633360790597](C:\Users\52949\AppData\Roaming\Typora\typora-user-images\1633360790597.png)

![1633360782386](C:\Users\52949\AppData\Roaming\Typora\typora-user-images\1633360782386.png)

![1633360821383](C:\Users\52949\AppData\Roaming\Typora\typora-user-images\1633360821383.png)





设置判断密码用户名等weibuwei空

![1633362638835](C:\Users\52949\AppData\Roaming\Typora\typora-user-images\1633362638835.png)

![1633415946635](C:\Users\52949\AppData\Roaming\Typora\typora-user-images\1633415946635.png)





顺序理清： 

main.js（抽离koa、app相关让主页面不复杂）->app/index.js(用户注册接口需要路由请求路径与映射)->router/user.router.js(创建router，使用router.post,函数具体逻辑ctxnext等抽离)->controller/user.controller.js(把回调函数封装为create，处理ctx，request，body相关，查询数据抽离)->services/user.services.js(处理sql语句，导入数据库链接)->授权判断相关->回到router在post里添加中间件(中间件使用抽离)->middleware/user.middleware.js(判断相关授权信息)

