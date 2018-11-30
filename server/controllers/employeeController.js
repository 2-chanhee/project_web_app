const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
var Book = require('../models/employee');

// => localhost:3000/employees/
router.get('/get-data', (req, res) => {
    Book.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Book.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/insert', function(req, res,next){
    var newBook = new Book();
    newBook.category = req.body.category;
    newBook.title = req.body.title;
    newBook.content = req.body.content;
    newBook.price = req.body.price;
    newBook.imgurl = req.body.imgurl;
    console.log("\n\n post req.body.title="+req.body.title);
    newBook.save(function(err,docs){
        if(err){
            console.error(err);
            res.json({result: 0});
            return;
        }else
        res.send(docs);
    });
});



router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var book = {
        category: req.body.category,
        title: req.body.title,
        content: req.body.content,
        price: req.body.price,
        imgurl: req.body.imgurl
    };
    Book.findByIdAndUpdate(req.params.id, { $set: book }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Book.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;