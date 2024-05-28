const express= require('express');
const customerController=require('../controllers/customers');
const {verifytoken,verifyRoles} = require("../middlewares/jwtHandler")

const router=express.Router();

router.get('/',[verifytoken,verifyRoles(['admin'])],customerController.getAllCustomer);
router.get('/:id',[verifytoken,verifyRoles(['admin'])],customerController.getCustomerById);
router.post('/',customerController.createCustomer);
router.put('/:id',[verifytoken,verifyRoles(['admin'])],customerController.updateCustomer);
router.delete('/:id',[verifytoken,verifyRoles(['admin'])],customerController.deleteCustomer);
router.post('/login',[verifytoken],customerController.loginCustomer)

module.exports=router;