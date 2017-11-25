const mongoose = require('mongoose');
const schema = mongoose.Schema

const fileSchema = new schema({
    size: {type: Number, required: true},
    fileid: {type: String, required: true}
})

const storerSchema = new schema({
    phoneID: {type: String, required: true},
    allocatedmemory: {type: Number, required: true},
    files: {type: [fileSchema], required: false}
}, {collection: 'storers'});

module.exports = mongoose.model('file', fileSchema);
module.exports = mongoose.model('storer', storerSchema);