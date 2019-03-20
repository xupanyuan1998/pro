/*var mongoose=require('mongoose');
var category=require('../schemas/category');
module.exports=mongoose.model('category',category);*/

var mongoose = require('mongoose');

var category = require('../schemas/category');

module.exports = mongoose.model('category', category);