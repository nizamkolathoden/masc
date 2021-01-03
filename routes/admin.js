const router = require('express').Router();
//middleware 
const requirelogin = require('../middleware/index')

//student database
const Student = require('../model/student');

//teacher DB
const Teacher = require('../model/teacher');


//course DB
const Course = require('../model/course');

//@desc for post student data to admin
//@route post /admin/poststudent
router.post('/poststudent', (req, res) => {
    const { name, batch, admno, sem, course } = req.body;

    if (!name || !batch || !admno || !sem || !course) return res.json({ error: 'enter all fields' });

    Student.findOne({ admno: admno }).then(existingUser => {
        if (existingUser) {
            return res.json({ error: 'user all ready exist' })
        } else {
            new Student({
                name,
                batch,
                admno,
                sem,
                course
            }).save().then(data => {
                console.log(data);
                return res.json(data)
            })
        }
    })



})

//@desc for post teacher data to admin
//@route post /admin/post/teacher

router.post('/post/teacher', (req, res) => {
    const { name } = req.body;
    if (!name) return res.json({ error: 'fill all fields' });
    new Teacher({
        name,
    }).save().then(data => res.json(data))
})

//@desc for get teacher data to admin
//@route get /admin/show/teacher

router.get('/show/teacher', requirelogin, (req, res) => {
    Teacher.find().then(data => res.json(data))
})



//@desc for post subjects for teacher
//@route post /admin/post/subject/:id

router.put("/post/subject/:id", (req, res) => {
    const { name, batch, sem, } = req.body;
    if (!name || !batch || !sem) return res.json({ error: "fill all the fields" });

    new Course({
        name,
        batch,
        sem
    }).save().then(data => {
        Teacher.findByIdAndUpdate(req.params.id, {
            $push: { 'course': data._id }
        }, {
            new: true
        }).populate('course').then(show => res.json(show))
            .catch(e => {
                console.log('error @ added subject', e)
            })
    }).catch(e => {
        console.log('error @ post subject', e)
    })

})


//@desc adding question
//@route post  /post/question

router.post('/question', (req, res) => {

        const question = {
            text: req.body.question
        }
        Course.find().then(allCourse => {
            allCourse.map(singleCourse => {
                Course.findByIdAndUpdate(singleCourse._id, {
                    $push: { 'question': question }
                }, {
                    new: true
                }).exec((e, data) => {
                    if(e){
                        return cosole.log(e)
                    }
                    console.log(data)
                })
            })
        })
    })


//test
//put /admin/update

router.put("/update", (req, res) => {
    const question = {
        text: req.body.id
    }
    Teacher.findOneAndUpdate({ "course._id": "5fec2c7b1219c44cad762294" }, {
        $push: { 'course.$.question': question }
    }, {
        new: true
    }).exec((e, data) => res.json(data))
})
//test
router.get('/check', (req, res) => {
    Course.find().populate('question.text').then(data => res.json(data))
})





module.exports = router










/* //@desc for post question and option for teacher schema
//@route post /admin/addquestion

router.post('/addquestion', (req, res) => {
    //it will be change
    const { question, option } = req.body

    if (!question || !option) return res.json({ error: 'plz fill all the fields' });

    Teacher.find().then(allTeacher => {
        allTeacher.map(singleTeacherData => {
            Teacher.findByIdAndUpdate(singleTeacherData._id, {
                $push: { question: question, option: option }
            },
                {
                    new: true
                }

            ).exec((err, addedQuestion) => {
                if (err) console.log('error at auto adding question in teacher:', err);
                console.log(addedQuestion);
            })
        })
    })

}) */







