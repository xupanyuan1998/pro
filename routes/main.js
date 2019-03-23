var express = require('express');
var main = express.Router();
var user = require('../models/user');
var category = require('../models/category');
main.get('/', function (req, res) {
    category.find().then(function (info) {
        res.render('main/blogs.html', {name: req.usercookie, nav: info});
    })
});
module.exports = main;