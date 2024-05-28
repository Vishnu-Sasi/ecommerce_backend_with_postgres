const express=require('express');
const brandController=require('../controllers/brands');
const {verifytoken,verifyRoles} = require("../middlewares/jwtHandler")

const router=express.Router();

router.get('/',brandController.getAllBrand);
router.get('/:id',brandController.getBrandById);
 router.post('/',[verifytoken,verifyRoles(['admin'])],brandController.createBrand);
router.put('/:id',[verifytoken,verifyRoles(['admin'])],brandController.updateBrand);
router.delete('/:id',[verifytoken,verifyRoles(['admin'])],brandController.deleteBrand);

module.exports=router;
