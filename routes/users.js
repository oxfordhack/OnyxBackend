var express = require('express');
var mongoose = require('mongoose');
var schema = mongoose.Schema
var router = express.Router();
var storercontroller = require('../controllers/storercontroller');

/* GET users listing. */

router.post('/storersetup', storercontroller.setupstorer);

module.exports = router;
