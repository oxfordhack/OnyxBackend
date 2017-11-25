const mongoose = require('mongoose');
const schema = mongoose.Schema
const file = require('../modesl/storermodel')

var posterschema = new schema({
    uid: {type: String, required: true},
    files: {type: [file]}
})

