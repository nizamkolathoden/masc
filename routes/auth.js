const router = require('express').Router()

//student model
const Student = require('../model/student');

const JWT = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

//@desc for login student data to web
//@route post /auth/login
router.post('/login', (req, res) => {
    const { admno,name } = req.body;

    if (!admno) return res.json({ error: 'enter all fields' });

    Student.findOne({ $and: [{ admno: admno }, { name: name }]  }).then(existingUser => {
        if (!existingUser) return res.json({ error: 'user not found plz check your admission number or your name' });
        const token = JWT.sign({ _id: existingUser._id }, JWT_SECRET)
        res.json({ token: token, user: existingUser })
    })


})

module.exports = router
