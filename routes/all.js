const router = require('express').Router();
//middle ware
const requireLogin = require('../middleware/index')
//teacher DB
const Teacher = require('../model/teacher')



//@desc show teacher data to student
//@route get /all/showteacher 
router.put('/showteacher', requireLogin,(req, res) => {
    const { batch, sem } = req.body;
    if (!sem) return res.status(402).json({ error: 'enter ' });
    if (!batch) return res.status(402).json({ error: 'enter bath' });


    Teacher.find().elemMatch("course", { batch: batch, sem: sem }).then(data => res.json(data))

})



//@desc for shown teacher profile
//@route get /all/teacherprofile
router.get('/teacherprofile/:id',requireLogin, (req, res) => {
    const { batch, sem } = req.body

    Teacher.findOne({ "course._id": req.params.id }).then(data => res.json(data)).catch(e => console.log('error at show single subject', e))
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