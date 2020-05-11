var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/user', userController.postUser);
router.get('/allusers', userController.getUsers);

module.exports = router;