var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const serverurl = 'mongodb://landon2008:Langtonrdsw9@ds121336.mlab.com:21336/onyx'

mongoose.connect(serverurl, {useMongoClient: true}, function(err){
    if(err){
        console.log(err.message)
    }else{
        console.log('connection made')
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
