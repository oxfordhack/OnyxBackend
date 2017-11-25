const mongoose = require('mongoose');
const schema = mongoose.Schema

const fileSchema = new schema({
    size: {type: Number, required: true},
    filename: {type: String, required: true},
    encrypt: {type: String, required: false}
})

const storerSchema = new schema({
    phoneID: {type: String, required: true},
    allocatedmemory: {type: Number, required: true},
    files: {type: [fileSchema], required: false}
}, {collection: 'storers'});

module.exports = mongoose.model('storer', storerSchema);
module.exports = mongoose.model('file', fileSchema);