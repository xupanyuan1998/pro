var mongoose = require('mongoose');/*引入数据库*/
var schema = mongoose.Schema;

var user = new schema({
	email: String,
	username: String,/*用户名的类型为字符串*/
	password: String,/*密码的类型为字符串*/
	isAdmin: {/*是否为管理员*/
		default: false,
		type: Boolean
	}
});

module.exports = user;/*导出模块*/