var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var postercontroller = require('../controllers/postercontroller')

router.post('/postercreate', postercontroller.create);
router.post('/postersignin', postercontroller.signin)
router.post('/postfile', postercontroller.postfile);
router.post('/randomjsongenerate', postercontroller.randomdatagenerate);

module.exports = router;
