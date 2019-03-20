var express = require('express');
var main = express.Router();
var user = require('../models/user')
main.get('/', function (req, res) {
	res.render('main/blogs.html', {name: req.usercookie});
});
module.exports = main;