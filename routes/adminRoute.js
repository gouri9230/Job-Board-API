const express = require('express');
const router = express.Router();
const AdminSchema = require('../models/adminModel');
const AccessContol = require('accesscontrol');


router.post('/jobsboard/admin/employers/:id/approve', (req,res)=>{
    const {username, email, password} = req.params.body;

});

router.post('/jobsboard/users/ login', (req, res)=> {

});

router.get('/jobsboard/admin/employers/pending', (req, res)=> {

});

router.delete('/jobsboard/admin/jobs/:id', (req,res)=>{

});