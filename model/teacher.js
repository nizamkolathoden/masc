const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const teacherSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    course:[{
    
            name:{
                type:String
            },
           batch:{
               type:String
           },
           sem:{
               type:String
           },
         question:[{
             text:{
                type:ObjectId,
                ref:'question'    
             },
             good:[{
                 type:ObjectId,
                 ref:'student'
             }],
             bad:[{
                 type:ObjectId,
                 ref:'student'
             }],
             poor:[{
                 type:ObjectId,
                 ref:'student'
             }]
         }]
        
    }],
    
})

module.exports  = mongoose.model('teacher',teacherSchema);