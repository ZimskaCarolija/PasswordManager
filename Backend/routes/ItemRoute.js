const express = require('express');
const  ItemController  = require('../controller/ItemController');
const Validator = require('../util/validation')
const router = express.Router();

router.post('/Insert',Validator.verifyToken, ItemController.ItemInsert);
router.post('/ReturnAllName', Validator.verifyToken,ItemController.ItemReturnAllName);
router.get('/ReturnOne/:id',Validator.verifyToken,Validator.verifySecurityTime,Validator.verifyCode, ItemController.ItemReturnId);
router.delete('/Delete/:id',Validator.verifyToken,Validator.verifySecurityTime,Validator.verifyCode, ItemController.ItemDeleteId);
module.exports = router;
//add validtion for checking security code