const productRepository = require("../repositories/products");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/asyncHandler");
const productService = require("../services/productService");

const getAllProduct = asyncHandler(async (req, res, next) => {
  try {
    const products = await productRepository.getAllProduct();
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const getProductById = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await productRepository.getProductById(id);
    if (product) {
      return res.status(200).json({ success: true, data: product });
    } else {
      next(new ErrorResponse("Product doesnt exist with id", 404));
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const createProduct = asyncHandler(async (req, res, next) => {
  try {
    const { name, price, categoryId, brandId } = req.body;
    const offerPrice = productService.calculateOffer(price);
    await productRepository.createProduct({
      name,
      price,
      offerPrice,
      categoryId,
      brandId,
    });
    res
      .status(201)
      .json({ success: true, message: "Successfully created product" });
  } catch (error) {
    console.error("Error occurred in createProduct:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const updateProduct = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, price, categoryId, brandId } = req.body;
    const offerPrice = productService.calculateOffer(price);
    const product = await productRepository.updateProduct(id, {
      name,
      price,
      offerPrice,
      categoryId,
      brandId,
    });
    if (product) {
      res.status(200).json(product);
    } else {
      next(new ErrorResponse("Product doesnt exist with id", 404));
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const deleteProduct = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const success = await productRepository.deleteProduct(id);
    if (success) {
      res.status(200).json({ message: "Proudct deleted successfully" });
    } else {
      next(new ErrorResponse("Product doesnt exist with id", 404));
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  getAllProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
