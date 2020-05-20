var express = require('express');
var router = express.Router();
const categoryController = require('../controllers/category.controller');

router.post('/category', categoryController.postCategory);
router.get('/allcategories', categoryController.getCategories);
router.put('/category/:id', categoryController.putCategory);
router.delete('/category/:id', categoryController.deleteCategory);

module.exports = router;