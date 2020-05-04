var express = require('express');
var router = express.Router();
const profileController = require('../controllers/profile.controller');

router.post('/profile', profileController.postProfile);

module.exports = router;