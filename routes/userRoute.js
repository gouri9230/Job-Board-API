const express = require('express');
const router = express.Router();
const {userRegister, userLogin} = require('../controllers/userController');


router.post('/jobsboard/users/register', userRegister);

router.post('/jobsboard/users/login', userLogin);

router.get('/jobsboard/view/jobslist', (req, res)=> {

});

router.post('/jobsboard/jobs/:id/application', (req,res)=>{

});