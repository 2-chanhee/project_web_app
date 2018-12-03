const express = require('express');
const router = express.Router();
const mongoose = require('mongoose').Types.ObjectId;
const ctrlUser = require('../controllers/user.contoller');
const jwtHelper = require('../config/jwtHelper');


router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/useredit', jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/admin',ctrlUser.UserList);
router.put('/:id',jwtHelper.verifyJwtToken,ctrlUser.Edituser);
module.exports = router;