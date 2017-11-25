var express = require('express');
var mongoose = require('mongoose');
var storers = require('../modesl/storermodel');
var posters = require('../modesl/postermodel');
var filenames = require('../modesl/filesmodel');
var notify = require('../modesl/notificationmodel');
const crypto = require('crypto-js');
var router = express.Router();
const secretkey = 'qwerty'

exports.checkposter = function(req, res) {

    if(req.err){
        return res.status(500).json({'error': 'something was wrong with the body'})
    }else{
        const uid = req.body['uid'];
        console.log(uid)
        posters.findOne({uid: uid}, function(err, body) {
            if(!body){
                return res.json({'error': true})
            }
        })
    }
}

exports.postfile = function(req, res) {
    if(req.err){
        return res.status(500).json({'error': 'something was wrong with the body'})
    }else {
        const fileinstance = new filenames({
            size: req.body['filesize'],
            filename: req.body['filename']
        })
        console.log(req.body)
        var imagebinary = req.body['base64StrImage']
        // Encrypt
        var ciphertext = crypto.AES.encrypt(JSON.stringify(imagebinary), secretkey);

        const notification = new notify({
            encrypted: ciphertext,
            filename: fileinstance.filename,
        })

        console.log(fileinstance)
        return res.json({})

// Decrypt
//         var bytes  = crypto.AES.decrypt(ciphertext.toString(), secretkey);
//         var decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8));


    }
}

exports.randomdatagenerate = function(req, res) {

    storers.find({'phoneID':'58DE7460-C80F-4C90-9293-58EC180A22C2'})
        .populate('files')
        .exec(function(err, storer){
            if(err){
                return res.json({'err': err.message})
            }else{
                return res.json({'body': storer})
            }
        })
}