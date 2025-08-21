const express = require('express');
const {jobPost} = require('../controllers/jobController');
const verifyAcessToken = require('../middleware/validateToken');

router = express.Router();

router.post('/postjob', verifyAcessToken(process.env.SECRET_TOKEN_EMPLOYER, 'employer'), jobPost);

module.exports = router;