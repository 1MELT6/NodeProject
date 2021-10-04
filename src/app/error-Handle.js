const errorType = require('../constants/error-types')

const errorHandle = (error, ctx) => {
    // console.log(error.message);

    switch (error.message) {
        case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
        status = 404;
            message = "不能为空";
            break;
        default:
            status = 404;
            message = "ＮＯＴＦＯＵＮＤ";

    }
    ctx.status = status;
    ctx.body = message

}

module.exports = errorHandle