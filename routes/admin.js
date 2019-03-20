var express = require('express');
var user = require('../models/user');
var category = require('../models/category');
var json = {};
var admin = express.Router();
//用户管理
admin.get('/userslist', function (req, res) {
	var limit = 20,
		page = Number(req.query.page) || 1;//设置当前在第几页
	user.count().then(function (info) {
		var pages = Math.ceil(info / limit);
		var skip = (page - 1) * limit;
		user.find().limit(limit).skip(skip).then(function (info2) {
			res.render('./admin/admin.html', {name: info2, page: page, pages: pages, limit: limit, info: info});
		})
	})
});
//分类管理
admin.get('/userslist/cata', function (req, res) {
	category.find().then(function (info) {
		res.render('./admin/cata.html', {name: info});
	})
});
//新增分类
admin.post('/userslist/addcata', function (req, res) {
	var name = req.body.name;
	category.findOne({
		name: name
	}).then(function (info) {
		if (info) {
			json.code = 6;
			json.msg = '分类名已存在';
			res.send(json);
			return;
		}
		var categorys = new category({
			name: name
		});
		return categorys.save();
		res.end();
	}).then(function (newinfo) {
		json.code = 7;
		json.msg = '添加成功';
		res.send(json);
	})
});
//修改分类
admin.get('/userslist/modcata', function (req, res) {
	var id = req.query.id,
		name = req.query.name;
	category.findOne({//在数据库里找id不等于他的ID且名字跟他一样的 看下有没有如果没有的话就修改一下 有的话就返回前端
		_id: {$ne: id},
		name: name
	}).then(function (info) {
		if (info) {
			json.code = 7;
			json.msg = '您修改的分类名称已存在';
			res.send(json);
			return
		} else {
			return category.updateOne({_id: id}, {name: name})
		}
	}).then(function (newinfo) {
		console.log(newinfo)
		json.code = 4;
		json.msg = '修改成功';
		res.send(json)
	})
})
module.exports = admin;