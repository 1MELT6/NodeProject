const errorType = require('../constants/error-types')

const errorHandle = (error, ctx) => {
    // console.log(error.message);

    switch (error.message) {
        case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
            status = 404;
            message = "不能为空";
            break;
        case errorType.NAME_IS_ALREADY_EXISTS:
            status = 409;
            message = "用户名已经被注册";
            break;
        default:
            status = 404;
            message = "ＮＯＴＦＯＵＮＤ";

    }
    ctx.status = status;
    ctx.body = message

}

module.exports = errorHandle