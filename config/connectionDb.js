const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const connectDB = asyncHandler(async ()=> {
    const connect = await mongoose.connect(process.env.CONNECTION_DB); 
    console.log("Database connection established", connect.connection.host, connect.connection.name);
});

module.exports = connectDB;