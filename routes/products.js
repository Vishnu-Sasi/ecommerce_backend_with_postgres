const express=require('express');
const productController=require('../controllers/products');
const {verifytoken,verifyRoles} = require("../middlewares/jwtHandler")
const router=express.Router();

router.get('/',productController.getAllProduct)
router.get('/:id',productController.getProductById);
router.post('/',[verifytoken,verifyRoles(['admin'])],productController.createProduct);
router.put('/:id',[verifytoken,verifyRoles(['admin'])],productController.updateProduct);
router.delete('/:id',[verifytoken,verifyRoles(['admin'])],productController.deleteProduct);

module.exports=router;