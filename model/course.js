const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const CourseSchema = ({
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
     text:String,
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

})

module.exports = mongoose.model("course",CourseSchema)