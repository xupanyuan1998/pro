var express = require('express');
var main = express.Router();
var user = require('../models/user');
var category = require('../models/category');
var article = require('../models/article');
var jsoncontent = {};
//渲染首页
main.get('/', function (req, res) {
    category.find().then(function (info) {
        var limit = 10;
        var page = Number(req.query.page) || 1;
        article.countDocuments().then(function (newinfo) {
            var pages = Math.ceil(newinfo / limit);
            var skip = (page - 1) * limit;
            article.find().sort({'data': -1}).limit(limit).skip(skip).then(function (info2) {
                res.render('main/blogs.html', {name: req.usercookie, nav: info, main: info2, page: page, pages: pages});
            })
        })
    })
});
//渲染内页
main.get('/content', function (req, res) {
    var id = req.query.id;
    category.find().then(function (info1) {
        article.findOne({
            _id: id
        }).then(function (info) {
            info.read++;
            info.save();
            res.render('main/neiye.html', {name: req.usercookie, content: info, nav: info1});
        })
    })
});
//点赞
main.get('/neiye/wonder', function (req, res) {
    var id = req.query.id;
    article.findOne({_id: id}).then(function (info) {
        info.wonder++;
        info.save();
        res.send(info);
    })
});
//评论
main.get('/neiye/conments', function (req, res) {
    var id = req.query.id;
    var username = req.usercookie.username;
    var date = req.query.date
    article.findOne({_id: id}).then(function (info) {
        info.comments.unshift({
            username: username,
            comment: req.query.value,
            date: date,
            time: new Date(),
        });
        return info.save();
    }).then(function (info2) {
        jsoncontent.code = 1;
        jsoncontent.msg = '添加成功';
        res.send(jsoncontent);
    })
});
//分类
main.post('/cate', function (req, res) {
    var id = req.body.id;
    article.find({leibie: id}).sort({"data": 1}).then(function (info) {
        res.send(info);
        res.end();
    })
});
//渲染打赏页面
main.get('/rewards', function (req, res) {
    res.render('main/dashang.html', {name: req.usercookie})
});
//评论删除
main.get('/commentsdel', function (req, res) {
    var date = req.query.date;
    var id = req.query.id;
    article.update({_id: id}, {"$pull": {"comments": {"date": date}}}).then(function (info) {
        res.send(info)
    })
});
module.exports = main;