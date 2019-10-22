var express = require('express');
var router = express.Router();
const blogController = require('../controllers/blog.controllers');

router.get('/post/:id', blogController.getPublication);
router.get('/allposts', blogController.getPublications);
router.post('/post', blogController.postPublication);
router.put('/post/:id', blogController.putPublication);
router.delete('/post/:id', blogController.deletePublication);

module.exports = router;