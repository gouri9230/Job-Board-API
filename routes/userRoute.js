const express = require('express');
const router = express.Router();
const {userRegister, userLogin, jobsList} = require('../controllers/userController');
const verifyAcessToken = require('../middleware/validateToken');


router.post('/register', userRegister);

router.post('/login', userLogin);

router.get('/view/jobslist', verifyAcessToken(process.env.SECRET_TOKEN_USER, 'user'), jobsList);

//router.post('/jobsboard/jobs/:id/application',);

module.exports = router;