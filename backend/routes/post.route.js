var express = require('express');
var router = express.Router();
const blogController = require('../controllers/post.controller');
const { verifyToken } = require('../middlewares/login.middleware');

router.get('/post/:id', verifyToken, blogController.getPublication);
router.get('/allposts', verifyToken, blogController.getPublications);
router.post('/post', verifyToken, blogController.postPublication);
router.put('/post/:id', verifyToken, blogController.putPublication);
router.delete('/post/:id', verifyToken, blogController.deletePublication);

module.exports = router;