const mongoose = require('mongoose');
const schema = mongoose.Schema

const fileSchema = new schema({
    size: {type: Number, required: true},
    filename: {type: String, required: true},
    encrypt: {type: String, required: false}
})

module.exports = mongoose.model('file', fileSchema);