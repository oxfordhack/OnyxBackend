const mongoose = require('mongoose');
const schema = mongoose.Schema
const fileSchema = require('./filesmodel')


const storerSchema = new schema({
    phoneID: {type: String, required: true},
    allocatedmemory: {type: Number, required: true},
    files: {type: [fileSchema.ObjectId], required: false}
}, {collection: 'storers'});

module.exports = mongoose.model('storer', storerSchema);