const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/connectionDb');

const app = express();
connectDB();
app.listen((process.env.PORT), ()=>{
    console.log(`Server is listening at the port.... localhost:${process.env.PORT}`);
});

app.get('/', (req, res)=>{
    res.send("Just checking the connection");
});
