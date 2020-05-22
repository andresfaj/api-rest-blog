var express = require('express');
var router = express.Router();
const categoryController = require('../controllers/category.controller');
const { verifyToken } = require('../middlewares/login.middleware');

router.post('/category', verifyToken, categoryController.postCategory);
router.get('/allcategories', verifyToken, categoryController.getCategories);
router.put('/category/:id', verifyToken, categoryController.putCategory);
router.delete('/category/:id', verifyToken, categoryController.deleteCategory);

module.exports = router;