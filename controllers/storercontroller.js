var express = require('express');
var mongoose = require('mongoose');
var schema = mongoose.Schema
var router = express.Router();
var storerSchema = require('../modesl/storermodel');

exports.setupstorer = function(req, res) {
    if(req.err){
        res.status(401).json({'error': 'problem with request body'})
    }else{
        console.log('entered')
        const storersetupobj = new storerSchema({
            phoneID: req.body['phoneid'],
            allocatedmemory: req.body['allocatedmemory']
        })

        storersetupobj.save(function(err, body){
            if(err){
                return res.status(500).json({'error': err.message})
            }
            return res.status(200).json({'worked': 'success you are now store'})
        })
    }
}
