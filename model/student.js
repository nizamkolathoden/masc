const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true
    },
    sem: {
        type: String
    },
    admno: {
        type: String,
        required: true
    },

    totalattends: {
        type: String
    }
})

module.exports = mongoose.model('student', studentSchema)