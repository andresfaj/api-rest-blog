var express = require('express');
var router = express.Router();
const roleController = require('../controllers/role.controller');

router.post('/role', roleController.postRole);
router.get('/allroles', roleController.getRoles);

module.exports = router;