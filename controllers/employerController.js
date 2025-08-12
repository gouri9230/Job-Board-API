const Employers = require('../models/employerModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

// @desc Employer register
// POST /jobsboard/employers/register
// public
const employerRegister = asyncHandler (async (req, res)=>{
    const {username, password, company} = req.body;
    if (!username || !password || !company) {
        res.status(404);
        throw new Error("All inputs are required");
    }
    const employerAvailable = await Employers.findOne({username});
    if (employerAvailable) {
        console.log("Employer already registered");
        res.status(401);
        throw new Error("Employer already registered");
    }
    const hashedPassword = bcrypt.hash(password, 20);
    const employer = await Employers.create({username, password: hashedPassword, company});
    if (employer) {
        console.log("User is registered");
        res.status(201).json({_id: employer.id, username: employer.name, company: employer.company});
    }
    else {
        res.status(401);
        throw new Error("Error registering employer");
    }
});

// @desc Employer login
// POST /jobsboard/employers/login
// public
const employerLogin = asyncHandler (async (req, res)=> {
    const {username, password} = req.body;
    if (!username || !password) {
        res.status(404);
        throw new Error("All inputs are required");
    }
    const employer = await Employers.findOne({username});
    if (employer && (await bcrypt.compare(password, employer.password))) {
        const accesstoken = jwt.sign({
            employer: {
                username: employer.username,
                company: employer.company,
                id: employer.id
            }
        },
        process.env.SECRET_TOKEN_EMPLOYER,
        {expiresIn: '15m'}
        );
        res.status(201).json({accesstoken});
    }
    else{
        res.status(401);
        throw new Error("The page has expired");
    }
});

module.exports = {employerRegister, employerLogin}