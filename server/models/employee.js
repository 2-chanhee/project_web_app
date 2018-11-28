const mongoose = require('mongoose');

var Book = mongoose.model('Book', {
    category: { type: String },
    title: { type: String },
    content: { type: String },
    price: { type: String },
    imgurl: { type: String}
});

module.exports = { Book };