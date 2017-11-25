var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var postercontroller = require('../controllers/postercontroller')

router.post('/postercheck', postercontroller.checkposter);
router.get('/postfile', postercontroller.postfile)

module.exports = router;
