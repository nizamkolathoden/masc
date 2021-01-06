const router = require('express').Router();

//middle ware
const requireLogin = require('../middleware/index')

//teacher DB
const Teacher = require('../model/teacher')

//course DB
const Course = require('../model/course')

//@desc show teacher data to student
//@route get /all/showteacher 
router.put('/showteacher', requireLogin,(req, res) => {
    const { batch, sem } = req.body;
    if (!sem) return res.status(402).json({ error: 'enter ' });
    if (!batch) return res.status(402).json({ error: 'enter batch' });


    Teacher.find().populate({
        path: 'course',
       $elemMatch : {'batch' : req.body.batch},
       populate: {
        path: "course",
        select: ["batch", "sem"]
       }
    }).then(data => res.json(data))
    // .elemMatch("course", { batch: batch, sem: sem })
    .catch(e=>console.log(e))
})



//@desc for shown teacher profile
//@route get /all/teacherprofile
router.get('/teacherprofile/:id',requireLogin, (req, res) => {

    Course.findById( req.params.id).then(data => res.json(data))
    .catch(e => console.log('error at show single subject', e))
})

//@desc for good
//@route put /all/good
router.put("/good",(req,res)=>{
    
})



module.exports = router





//simple qureys delete in production time
/* router.put('/delete',(req,res)=>{
    Teacher.findByIdAndUpdate(req.body.id,{
        $pull:{'course':{_id:req.body.pullid}}
    },{
        new:true
    }).then(data=>res.json(data))
})

 {'$push': {
        'course.$.reviews': review
    }},(err)=>console.log(err)


 */



/* Teacher.findByIdAndUpdate(req.body.teacherid, {
    $push: { reviews: review }
},
    {
        new: true
    }
).exec((err, subjetadd) => res.json(subjetadd)) */