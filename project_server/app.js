require('./config/config');
require('./models/db');
require('./config/passportConfig');
var path = require('path');
const express     = require('express');
const bodyParser  = require('body-parser');
const cors        = require('cors');
const passport    = require('passport');
const { mongoose } = require('./db.js');

var employeeController = require('./controllers/employeeController.js');
var userController = require('./controllers/userController.js');

const rtsIndex  = require('./routes/index.router');

var app = express();

// middleware
app.use(bodyParser.json()); 
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(passport.initialize());
app.use('/api', rtsIndex);
app.use('/employees', employeeController);
app.use('/users',userController);
app.use(express.static(path.join(__dirname, 'public')));
// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    else{
        console.log(err);
    }
});

// start server
app.listen(process.env.PORT, () => 
    console.log(`Server started at port : ${process.env.PORT}`));