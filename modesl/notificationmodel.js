const mongoose = require('mongoose');
const schema = mongoose.Schema

const notifyschema = new schema({
    encrypted: {type: String, required: true},
    filename: {type: String, required: true},
    access: {type: Boolean, required: true, default: false}
})



module.exports = mongoose.model('notification', notifyschema);