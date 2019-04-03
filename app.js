var express = require('express');
var app = express();/*运行服务器*/
var api = require('./routes/api');/*引入自己写的后台的逻辑的路由*/
var main = require('./routes/main');
var admin = require('./routes/admin');
var swig = require('swig');
var parse = require('body-parser');
//引用数据库模块
var mongoose = require('mongoose');
//引用cookie
var cookie = require('cookies');
var multer = require('multer');
//引用user数据库
var user = require('./models/user');

var cons = require('consolidate');
//使用swig的方法渲染页面
app.set('html', 'view engine');

app.set('views', './tpl');

app.engine('html', swig.renderFile);
//种cookie
app.use(function (req, res, next) {
	req.cookie = new cookie(req, res);
	req.usercookie = {};
	if (req.cookie.get('user')) {
		try {
			req.usercookie = JSON.parse(req.cookie.get('user'));
			user.findById(req.usercookie._id).then(function (eee) {
				req.usercookie.isAdmin = eee.isAdmin;
				next();
			})
		} catch (e) {
			console.log(e)
		}
	} else {
		next()
	}
});
//设置文件发送内容
app.use(parse.urlencoded({extended: true}));
app.use('/public', express.static(__dirname + '/public'));/*设置静态托管页面*/
app.use('/api', api);/*逻辑模块*/
app.use('/index', main)/*前端逻辑模块*/
app.use('/admin', admin)/*后台管理页面模块*/
mongoose.connect('mongodb://localhost:27018/pblog', {useNewUrlParser: true}, function (err) {
	err ? console.log(err) : app.listen(8083);
})
