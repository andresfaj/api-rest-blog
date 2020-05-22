var express = require('express');
var router = express.Router();
const categoryController = require('../controllers/category.controller');
const { verifyToken, verifyAdmin_Role } = require('../middlewares/login.middleware');

router.post('/category', [verifyToken, verifyAdmin_Role], categoryController.postCategory);
router.get('/allcategories', verifyToken, categoryController.getCategories);
router.put('/category/:id', [verifyToken, verifyAdmin_Role], categoryController.putCategory);
router.delete('/category/:id', [verifyToken, verifyAdmin_Role], categoryController.deleteCategory);

module.exports = router;