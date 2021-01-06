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
     option1:[{
         type:ObjectId,
         ref:'student'
     }],
     option2:[{
         type:ObjectId,
         ref:'student'
     }],
     option3:[{
         type:ObjectId,
         ref:'student'
     }],
     option4:[{
        type:ObjectId,
        ref:'student'
    }],
    option5:[{
        type:ObjectId,
        ref:'student'
    }],
    option6:[{
        type:ObjectId,
        ref:'student'
    }],
    option7:[{
        type:ObjectId,
        ref:'student'
    }],
    option8:[{
        type:ObjectId,
        ref:'student'
    }],
    option9:[{
        type:ObjectId,
        ref:'student'
    }],
    option10:[{
        type:ObjectId,
        ref:'student'
    }],
    cover:Array
 }]

})

module.exports = mongoose.model("course",CourseSchema)