const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');
const Users = require('../models/userModel');
const jwt = require('jsonwebtoken');

// @desc Register a user
// @route POST /jobsboard/users/register
// @access public

const userRegister = asyncHandler (async (req,res)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password) {
        res.status(404);
        throw new Error("All fields are required.")
    }
    const userAvailable = await Users.findOne({email});
    if (userAvailable) {
        res.status(400);
        throw new Error("User with this email address is already registered");
    }
    const passwordHash = bcrypt.hash(password, 23);
    const user = await Users.create({username, email, password: passwordHash});
    if(user){
        console.log("User is registered.", user);
        res.status(201).json({_id:user.id, email: user.email});
    }
    else {
        console.log("User registration failed");
        res.status(400);
        throw new Error("User registeration failed");
    }

});

// @desc Login user
// @route POST /jobsboard/users/login
// @access public
const userLogin = asyncHandler (async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password) {
        res.status(404);
        throw new Error("All fields are required.")
    }
    const user = await Users.findOne({username});
    if (user && (await bcrypt.compare(password, user.password))) {
        const accesstoken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        },
        process.env.SECRET_TOKEN_USER,
        {expiresIn: '15m'}
        ); 
        res.status(201).json({accesstoken});
    }
    else {
        res.status(401);
        throw new Error("The page has expired");
    }
});

// @desc View list of jobs
// @route GET /jobsboard/view/jobslist
// @access private

module.exports = {userRegister, userLogin};