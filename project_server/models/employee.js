var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
category: String,
title: String,
content: String,
price: String,
imgurl: String
});

module.exports=mongoose.model('book',bookSchema);
