const express = require('express');
const app = express()
const DB = require('./config/DB');

// use json
app.use(express.json())

//dot env
const dot = require('dotenv');
dot.config({path:'./config/key.env'})

//call DB
DB();

//routes 
app.use("/admin",require('./routes/admin'));
app.use('/auth',require('./routes/auth'));
app.use('/all',require('./routes/all'))

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`server running on ${process.env.NODE_ENV} in ${PORT}  🔥🚀🔥`))