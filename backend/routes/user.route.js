var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken, verifyAdmin_Role } = require('../middlewares/login.middleware');

router.post('/user', [verifyToken, verifyAdmin_Role], userController.postUser);
router.get('/allusers', verifyToken, userController.getUsers);
router.get('/user/:id', verifyToken, userController.getUser);
router.put('/user/:id', [verifyToken, verifyAdmin_Role], userController.putUser);
router.delete('/user/:id', [verifyToken, verifyAdmin_Role], userController.deleteUser);

module.exports = router;