const express = require('express');
const verifyAcessToken = require('../middleware/validateToken');
const {employerRegister, employerLogin, jobPost} = require('../controllers/employerController');

router = express.Router();

router.post('/register', employerRegister);

router.post('/login', employerLogin);

//router.get('/jobsboard/jobs/:id/view');
//router.delete('jobsboard/jobs/:id');

module.exports = router;