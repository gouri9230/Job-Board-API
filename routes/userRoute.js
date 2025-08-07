const express = require('express');
const router = express.Router();
const userSchema = require('../models/userModel');


router.get('/jobsboard/register', (req,res)=>{
    const {username, email, password} = req.params.body;

})