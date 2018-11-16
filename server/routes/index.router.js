const express = require('express');
const router = express.Router();

const ctrlUser = require('../controller/user.controller'); // using for control

router.post('/register', ctrlUser.register);

module.exports = router;