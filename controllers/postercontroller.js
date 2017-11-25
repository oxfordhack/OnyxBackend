var express = require('express');
var mongoose = require('mongoose');
var posters = require('../modesl/postermodel')
var schema = mongoose.Schema
var router = express.Router();

exports.checkposter = function(req, res) {
    if(req.err){
        return res.status(500).json({'error': 'something was wrong with the body'})
    }else{
        const uid = req.body['uid'];
        posters.findOne({'uid': uid}, function(err, body) {
            if(err){
                return res.status(200).json({'error': 'user does not exist'})
            }
        })
    }
}

exports.postfile = function(req, res){

}