const mongoose = require('mongoose');
const schema = mongoose.Schema

const fileSchema = new schema({
    size: {type: Number, required: true},
    filename: {type: String, required: true},
}, {collection: 'fileCollection'});

module.exports = mongoose.model('file', fileSchema);