const mongoose = require('mongoose');
const schema = mongoose.Schema
const file = require('./filesmodel')

var posterschema = new schema({
    uid: {type: String, required: true},
    files: [{type: String, required: false, default: []}]
})

module.exports = mongoose.model('poster', posterschema);
