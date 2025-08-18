const express = require('express');
const router = express.Router();
const AdminSchema = require('../models/adminModel');
const AccessContol = require('accesscontrol');


router.post('/employers/:id/approve', (req,res)=>{
    const {username, email, password} = req.params.body;

});

router.post('/jobsboard/users/ login', (req, res)=> {

});

router.get('/employers/pending', (req, res)=> {

});

router.delete('/jobs/:id', (req,res)=>{

});

module.exports = router;