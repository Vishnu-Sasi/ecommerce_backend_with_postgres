const brandRepository = require("../repositories/brands");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/asyncHandler");

const getAllBrand=asyncHandler(async (req,res,next) =>{
    try{
        const brands=await brandRepository.getBrand();
        return res.status(200).json({success:true,data:brands});

    }catch(error){
        res.status(500).json({ error: "Internal server error" });
        
    }
})

const getBrandById=asyncHandler(async (req,res,next) => {
    try{
        const id=req.params.id;
        const brand=await brandRepository.getBrandById(id);
        if (brand){
            return res.status(200).json({success:true,data:brand});
        }else {
            next(new ErrorResponse("Product doesnt exist with id", 404));
          }
        }catch (error) {
          res.status(500).json({ error: "Internal server error" });
        }
})

const createBrand=asyncHandler(async (req,res,next) => {
    try{
        const {name} =req.body;
        await brandRepository.createBrand({ name });
    res
      .status(201)
      .json({ success: true, message: "Successfully created brand" });
    }catch(error){
        res.status(500).json({ error: "Internal server error" });
    }
})

const updateBrand = asyncHandler(async (req, res, next) => {
    try {
      const id = req.params.id;
      const { name } = req.body;
      const brand = await brandRepository.updateBrand(id, { name });
      if (brand) {
        res.status(200).json(brand);
      } else {
        next(new ErrorResponse("Brand doesnt exist with id", 404));
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  const deleteBrand = asyncHandler(async (req, res, next) => {
    try {
      const id = req.params.id;
      const success = await brandRepository.deleteBrand(id);
      if (success) {
        res.status(200).json({ message: "Brand deleted successfully" });
      } else {
        next(new ErrorResponse("Brand doesnt exist with id", 404));
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  module.exports={
    getAllBrand,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand
  }