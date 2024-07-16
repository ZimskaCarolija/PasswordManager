const express = require('express');
const { CreateSecToken } = require('../controller/UserController');
const Validator = require('../util/validation');
const router = express.Router();

router.post('/SecurityMail',Validator.verifyToken, CreateSecToken);

module.exports = router;
