var express = require('express');
var mongoose = require('mongoose');
var schema = mongoose.Schema
var router = express.Router();

exports.checkposter = function(req, res) {
    if(req.err){
        res.status(500).json({'error': 'something was wrong with the body'})
    }else{
        const uid = req.body['uid'];
        posters.findOne({'uid': uid}, function(err, body) {
            if(err){
                console.log(err.message)
            }
        })
    }
}

exports.postfile = function(req, res){

}