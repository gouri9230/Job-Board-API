const Employers = require('../models/employerModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

// @desc Employer register
// POST /jobsboard/employers/register
// public
const employerRegister = asyncHandler (async (req, res)=>{
    const {username, email, password, company, role} = req.body;
    if (!email || !password || !company || !role) {
        res.status(404);
        throw new Error("All inputs are required");
    }
    const employerAvailable = await Employers.findOne({company});
    if (employerAvailable) {
        console.log("Employer already registered");
        res.status(401);
        throw new Error("Employer already registered");
    }
    const hashedPassword = bcrypt.hash(password, 10);
    const employer = await Employers.create({username, email, password: hashedPassword, company, role});
    if (employer) {
        console.log("User is registered");
        res.status(201).json({_id: employer.id, username: employer.name, email: employer.email, company: employer.company, role: employer.role});
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
                email: employer.email,
                company: employer.company,
                role: employer.role,
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

// @desc Post job by employer
// POST /jobsboard/employers/postjob
// private
const jobPost = asyncHandler( async (req, res)=>{
    const {title, job_description, job_id} = req.body;
    if (!title || !job_description) {
        res.status(400);
        throw new Error("Provide Job title and description");
    }
    const jobid = await Employers.findOne({job_id});
    if (jobid) {
        res.status(401).json({message: "Job with this id already exists"});
    }
    const job = await Employers.create({title, job_description, job_id});
})
module.exports = {employerRegister, employerLogin,jobPost}