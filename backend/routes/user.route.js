var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middlewares/login.middleware');


router.post('/user', userController.postUser);
router.get('/allusers', verifyToken, userController.getUsers);
router.put('/user/:id', userController.putUser);
router.delete('/user/:id', userController.deleteUser);

module.exports = router;