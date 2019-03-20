var express = require('express');

var api = express.Router();
//引入表user
var user = require('../models/user');
api.get('/user/reg', function (req, res) {
	res.render('main/login.html', {});
});/*渲染注册页面*/
api.get('/user/log', function (req, res) {
	res.render('main/land.html', {});
});
var json = {};
//注册
api.post('/user/res', function (req, res) {
	var username = req.body.username,
		email = req.body.email,
		password = req.body.password,
		repassword = req.body.repassword;
	if (repassword != password) {
		json.code = 1;
		json.msg = '两次密码不一致，请重新输入'
		res.send(json)
		return;
	}
	user.findOne({
		username: username
	}).then(function (info) {
		if (info) {
			json.code = 2;
			json.msg = '用户已存在，请更换用户名';
			res.send(json);
			return;
		} else {
			var users = new user({
				username: username,
				password: password,
				email: email
			});
			return users.save();
		}
	}).then(function (newinfo) {
		console.log(newinfo + 1111);
		if (newinfo) {
			json.code = 3;
			json.msg = '注册成功';
			res.send(json);
			console.log(json + 2222);
			res.end();
		}
	})
});
//登录
api.post('/user/login', function (req, res) {
	var username = req.body.username;
	var password = req.body.password;
	user.findOne({
		username: username,
		password: password
	}).then(function (info) {
		if (!info) {
			json.code = 4;
			json.msg = '用户名不存在';
			res.send(json);
			return;
		}
		req.cookie.set('user', JSON.stringify({
			_id: info._id,
			username: info.username
		}));
		json.code = 5;
		json.msg = '登陆成功';
		res.send(json);
		res.end();
	})

});
//退出
api.get('/user/logout', function (req, res) {
	req.cookie.set('user', null);
	json.code = 6;
	json.msg = '退出成功';
	res.send(json)
	res.end();
});
module.exports = api;