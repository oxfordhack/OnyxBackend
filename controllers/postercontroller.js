var express = require('express');
var mongoose = require('mongoose');
var storers = require('../modesl/storermodel');
var posters = require('../modesl/postermodel');
var filenames = require('../modesl/filesmodel');
var notify = require('../modesl/notificationmodel');
const crypto = require('crypto-js');
var admin = require("firebase-admin");
var serviceAccount = require("../onyxnotify-firebase-adminsdk-o9vvb-22b29ebf32.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://onyxnotify.firebaseio.com"
});

var options = {
    token: {
        key: "path/to/APNsAuthKey_XXXXXXXXXX.p8",
        keyId: "key-id",
        teamId: "developer-team-id"
    },
    production: false
};

var apnProvider = new apn.Provider(options);

var router = express.Router();
const secretkey = 'qwerty';

exports.create = function(req, res) {
    if(req.err){
        return res.status(500).json({'error': 'something was wrong with the body'})
    }else{
        const uid = req.body['uid'];
        const newposter = new posters({
            uid: uid
        })
        newposter.save({uid: uid}, function(err, body) {
            if(err){
                console.log({'error': err.message})
            }else{
                console.log(body)
                return res.json({'message': 'successfully sign up user'})
            };
        });
    };
};

exports.signin = function(req, res){
    if(req.err){
        return res.status(500).json({'error': 'something was wrong with the body'})
    }else{
        const uid = req.body['uid'];
        posters.find({'uid': uid}, function(err, body){
            if(body.files.length == 0){
                return res.json({'error': true})
            }else{
                return res.json({'body': body.files})
            }
        })
    }
}

exports.postfile = function(req, res) {
    if(req.err){
        return res.status(500).json({'error': 'something was wrong with the body'})
    }else {
        console.log(req.body)
        //FILE INSTANCE

        var imagebinary = req.body['base64StrImage']
        const uid = req.body['uid']
        var ciphertext = crypto.AES.encrypt(JSON.stringify(imagebinary), secretkey);

        const fileinstance = new filenames({
            size: req.body['filesize'],
            filename: req.body['filename'],
            encryptedfile: ciphertext
        });

        const filelocationref = req.body['filename']

        var payload = {
            data: {
                filename: filelocationref
            }
        };

        // GRAB THE ENCRPYTED IMAGE

        //CREATE THE NOTIFICATION SCHEMA
        const notification = new notify({
            encrypted: ciphertext,
            filename: fileinstance.filename,
        })

        const option = {
            priority: "high",
            timetolive: 24 * 60 * 60
        }

        //CHOOSE THE PERSON WHO HAVE THE MOST MEMORY AVAILABLE WITH THE PYTHON SCRIPT

        storers.find({},function(err, body) {
            if(err) {
                console.log({'err': err.message})
            } else {
                // console.log(body)
                const jsonstorers = body

                //AFTER YOU FINISH THIS PART THEN CONTINUE MAKING IT MORE ELABORATE
                const objects = body[0]
                console.log(objects)
                var notifytoken  = objects['phoneID']

                //NOW DO NOTIFICATIONS IN CALLBACK, THEN ADD THE FILE INSTANCE WE MADE ABOVE TO IT

                admin.messaging().sendToDevice(notifytoken, payload, option)
                    .then(function(response) {
                        console.log("Successfully sent message:", response.error);
                        // now do the other shit

                        // uploadfileobject(notifytoken, fileinstance)

                    })
                    .catch(function(error) {
                        console.log("Error sending message:", error);
                    });
            }
        });

        //UPLOAD NEW FILE TO FILESCHEMA THEN ADD THE FILEID TO STORER SCHEMA AND FINALLY
        //
        function uploadfileobject(token, obj){

            fileinstance.save(obj, function(err, body){
                if(err){
                    return res.json({'error': err.message})
                }else{
                    const fileid = body._id
                    storers.find({'phoneID': token}, function(err, body){
                        if(body){
                            return res.json({'err': err.message})
                        }else{
                            console.log(body)
                            body.files.push(fileid)
                            body.save(function(err, body){
                                //NOW ADD THE FILENAME TO THE USER SCHEMA
                                posters.find({'uid': uid}, function(err, body){
                                    if(err){
                                        return res.json({'error': err.message})
                                    }else{
                                        body.files.push(req.body['filename'], function(err, body){
                                            if(err){
                                                return res.json({'callback': false})
                                            }else{
                                                const message = 'successfully added ' + req.body['filename'] + ' to onyx drive'
                                                return res.status(200).json({'callback':{'message': message, 'body': body.files}})
                                            }
                                        })
                                    }
                                })
                            })
                        }
                    })
                }
            })
        }

// Decrypt
//         var bytes  = crypto.AES.decrypt(ciphertext.toString(), secretkey);
//         var decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8));

    }
}

exports.suitablestorerID = function(req, res) {
    if(req.err){
        return res.json('error nothing worked')
    }else{
        console.log(res.json({'body': req.body}))
    }
}

exports.randomdatagenerate = function(req, res) {

    storers.find(function(err, body){
        const jsonstorers = body
        var child_process = require('child_process');
        child_process.exec('python AnalyseData2.py', function (err){
            if (err) {
                console.log("child processes failed with error code: " + err.code);
            }
        });
    })
}