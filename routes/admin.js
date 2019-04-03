var express = require('express');
var user = require('../models/user');
var category = require('../models/category');
var article = require('../models/article');
var json = {};
var admin = express.Router();
//用户管理
admin.get('/userslist', function (req, res) {
	var limit = 20,
		page = Number(req.query.page) || 1;//设置当前在第几页
    user.countDocuments().then(function (info) {
		var pages = Math.ceil(info / limit);
		var skip = (page - 1) * limit;
		user.find().limit(limit).skip(skip).then(function (info2) {
			res.render('./admin/admin.html', {name: info2, page: page, pages: pages, limit: limit, info: info});
		})
	})
});
//分类管理
admin.get('/userslist/cata', function (req, res) {
    category.find().sort({key: 1}).then(function (info) {
		res.render('./admin/cata.html', {name: info});
	})
});
//新增分类页面
admin.get('/userslist/addcata', function (req, res) {
    res.render('./admin/addcata.html', {})
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
            return category.update({_id: id}, {name: name})
		}
	}).then(function (newinfo) {
		json.code = 4;
		json.msg = '修改成功';
		res.send(json)
	})
});
//删除分类
admin.get('/userslist/catadel', function (req, res) {
    id = req.query.id;
    category.deleteOne({
        _id: id
    }).then(function (info) {
        json.code = 8;
        json.msg = '删除成功';
        res.send(json)
    })
});
//新增文章页面
admin.get('/userslist/addarticle', function (req, res) {
    category.find().sort({_id: 1}).then(function (info) {
        res.render('./admin/addarticle.html', {cata: info})
    })
});
admin.post('/userslist/article', function (req, res) {
    var title = req.body.title,
        int = req.body.int,
        data = new Date().toLocaleString(),
        content = req.body.content,
        leibie = req.body.leibie,
        names = req.body.names;
    console.log(data)
    new article({
        data: data,
        title: title,
        int: int,
        content: content,
        leibie: leibie,
        names: names
    }).save().then(function (info) {
        json.code = 6;
        json.msg = '添加成功';
        res.send(json);
    })
});
//文章管理
admin.get('/userslist/article', function (req, res) {
    var limit = 10;
    var page = Number(req.query.page) || 1;
    article.countDocuments().then(function (info) {
        var pages = Math.ceil(info / limit);
        var skip = (page - 1) * limit;
        article.find().sort({'data': -1}).limit(limit).skip(skip).then(function (info2) {
            category.find().then(function (newinfo) {
                res.render('./admin/article.html', {
                    article: info2,
                    page: page,
                    pages: pages,
                    limit: limit,
                    info: info,
                    cata: newinfo
                })
            })
        })
    })
});
//文章修改
admin.get('/userslist/article/xiugai', function (req, res) {
    var id = req.query.id;
    article.findOne({
        _id: id
    }).then(function (info) {
        res.send(info)
    })
});
admin.post('/userslist/article/xiugais', function (req, res) {
    var id = req.body.id,
        title = req.body.title,
        int = req.body.int,
        leibie = req.body.leibie,
        names = req.body.names,
        content = req.body.content;
    article.updateOne({_id: id}, {
        title: title,
        int: int,
        leibie: leibie,
        names: names,
        content: content
    }).then(function (info) {
        json.code = 9;
        json.msg = '修改成功';
        res.send(json)
    })
});
//文章删除
admin.get('/userslist/artlic/del', function (req, res) {
    var id = req.query.id;
    article.deleteOne({_id: id}).then(function (info) {
        json.code = 5;
        json.msg = '删除成功';
        res.send(json);
    })
})
module.exports = admin;