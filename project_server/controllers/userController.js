const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
var User = require('../models/user');


// => localhost:3000/employees/
router.get('/', (req, res) => {
    User.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Users :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    User.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving User :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/register', (req, res) => {
    var user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
    });
    user.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in User Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var user = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        
    };
    User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in User Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in User Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;