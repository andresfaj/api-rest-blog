var express = require('express');
var router = express.Router();
const blogController = require('../controllers/post.controller');
const { verifyToken, verifyAdmin_Role } = require('../middlewares/login.middleware');

router.get('/post/:id', verifyToken, blogController.getPublication);
router.get('/allposts', verifyToken, blogController.getPublications);
router.post('/post', verifyToken, blogController.postPublication);
router.put('/post/:id', [verifyToken, verifyAdmin_Role], blogController.putPublication);
router.delete('/post/:id', [verifyToken, verifyAdmin_Role], blogController.deletePublication);

module.exports = router;