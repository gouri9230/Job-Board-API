const asyncHandler = require('express-async-handler');
const Jobs = require('../models/jobModel');

// @desc Create a job post
// POST /jobsboard/postjob
// private
const jobPost = asyncHandler( async (req, res)=>{
    const {title, job_description, job_id} = req.body;
    if (!title || !job_description) {
        res.status(400);
        throw new Error("Provide Job title and description");
    }
    const jobid = await Jobs.findOne({job_id});
    if (jobid) {
        res.status(401).json({message: "Job with this id already exists"});
    }
    const job = await Jobs.create({title, job_description, job_id, employer_id: req.employer.id});
    res.status(201).json(job);
});

module.exports = {jobPost}