const express=require('express');
const categoryController=require('../controllers/categories');
const {verifytoken,verifyRoles} = require("../middlewares/jwtHandler")

const router=express.Router();

router.get('/',categoryController.getAllCategory);
router.get('/:id',categoryController.getCategoryByID);
router.post('/',[verifytoken,verifyRoles(['admin'])],categoryController.createCategory);
router.put('/:id',[verifytoken,verifyRoles(['admin'])],categoryController.updateCategory);
router.delete('/:id',[verifytoken,verifyRoles(['admin'])],categoryController.deleteCategory);

module.exports=router;