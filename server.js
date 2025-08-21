const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/connectionDb');
const userRouter = require('./routes/userRoute');
const employerRouter = require('./routes/employerRoute');
const jobRouter = require('./routes/jobRoute');
const adminRouter = require('./routes/adminRoute');

const app = express();
connectDB();
app.use(express.json());

app.listen((process.env.PORT), ()=>{
    console.log(`Server is listening at the port.... localhost:${process.env.PORT}`);
});

app.get('/', (req, res)=>{
    res.send("Just checking the connection");
});

app.use('/jobsboard/users/', userRouter);
app.use('/jobsboard/employers/', employerRouter);
app.use('/jobsboard', jobRouter);
app.use('/jobsboard/admin', adminRouter);
