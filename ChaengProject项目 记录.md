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



controller数 service也是函数 导出的时候都是new一个 引入直接写名字

![1633416892999](C:\Users\52949\AppData\Roaming\Typora\typora-user-images\1633416892999.png)



加密：

![1633418043158](C:\Users\52949\AppData\Roaming\Typora\typora-user-images\1633418043158.png)



## 3、用户登录

![1633419480797](C:\Users\52949\AppData\Roaming\Typora\typora-user-images\1633419480797.png)

授权鉴定

目录读取理解不清晰

![1633422428976](C:\Users\52949\AppData\Roaming\Typora\typora-user-images\1633422428976.png)

更改美观：

![1633422765092](C:\Users\52949\AppData\Roaming\Typora\typora-user-images\1633422765092.png)

![1633422752795](C:\Users\52949\AppData\Roaming\Typora\typora-user-images\1633422752795.png)

![1633422775506](C:\Users\52949\AppData\Roaming\Typora\typora-user-images\1633422775506.png)

![1633422788902](C:\Users\52949\AppData\Roaming\Typora\typora-user-images\1633422788902.png)

this为隐式绑定

`l web开发中，我们使用最多的协议是http，但是http是一个无状态的协议。`

安装jsonwebtoken



authmiddleware中间件 user忘记导出 1our 所以前面的user都是undefined

![1633447063262](C:\Users\52949\AppData\Roaming\Typora\typora-user-images\1633447063262.png)

![1633501968278](C:\Users\52949\AppData\Roaming\Typora\typora-user-images\1633501968278.png)

bearer有空格

![1633505982763](C:\Users\52949\AppData\Roaming\Typora\typora-user-images\1633505982763.png)

![1633524165949](C:\Users\52949\AppData\Roaming\Typora\typora-user-images\1633524165949.png)

![1633524195029](C:\Users\52949\AppData\Roaming\Typora\typora-user-images\1633524195029.png)

逗号出错



## 4、修改动态：

验证权限 由于后期评论头像也要检验权限所以干脆把验证放在service里

鉴权:router->middleware->controller->service

修改:router-->controller->service

两步

![1633532356805](C:\Users\52949\AppData\Roaming\Typora\typora-user-images\1633532356805.png)

## 5、发布评论

![1633591835199](C:\Users\52949\AppData\Roaming\Typora\typora-user-images\1633591835199.png)

content

请求内容 要与![1633591860770](C:\Users\52949\AppData\Roaming\Typora\typora-user-images\1633591860770.png)

一致



请求permission多次调用auth.service

 代码重复过高

![1633597204390](C:\Users\52949\AppData\Roaming\Typora\typora-user-images\1633597204390.png)

如何获取tablename

![1633597257821](C:\Users\52949\AppData\Roaming\Typora\typora-user-images\1633597257821.png)

###### 解决1：闭包

![1633597470259](C:\Users\52949\AppData\Roaming\Typora\typora-user-images\1633597470259.png)

![1633597417953](C:\Users\52949\AppData\Roaming\Typora\typora-user-images\1633597417953.png)

###### 解决2：restful风格

![1633597713435](C:\Users\52949\AppData\Roaming\Typora\typora-user-images\1633597713435.png)

result风格 会有：params ->commentid等标识

![1633598351642](C:\Users\52949\AppData\Roaming\Typora\typora-user-images\1633598351642.png)





![1633598325248](C:\Users\52949\AppData\Roaming\Typora\typora-user-images\1633598325248.png)

![1633611425263](C:\Users\52949\AppData\Roaming\Typora\typora-user-images\1633611425263.png)



两种方式实现：1、单个接口两个功能在动态获取接口实现 2、两个接口两个功能两个获取