const express=require('express');
const orderController=require('../controllers/orders');
const {verifytoken,verifyRoles} = require("../middlewares/jwtHandler")
const router=express.Router();

router.get('/',[verifytoken],orderController.getAllOrder);
router.get('/:id',[verifytoken],orderController.getOrderById);
router.post('/',[verifytoken],orderController.createOrder);
router.put('/:id',[verifytoken],orderController.updateOrder);
router.delete('/:id',[verifytoken],orderController.deleteOrder);

module.exports=router