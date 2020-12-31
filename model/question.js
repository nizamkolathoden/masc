const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
    question:{
        type:String,
    }
   
})

module.exports = mongoose.model('question',questionSchema);