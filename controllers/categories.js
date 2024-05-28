const categoryRepository = require("../repositories/categories");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/asyncHandler");

const getAllCategory = asyncHandler(async (req, res, next) => {
  try {
    const categories = await categoryRepository.getCategory();
    return res.status(200).json({ success: true, data: { categories } });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const getCategoryByID = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const category = await categoryRepository.getCategoryByID(id);
    if (category) {
      return res.status(200).json({ success: true, data: category });
    } else {
      next(new ErrorResponse("Category doesnt exist with id", 404));
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const createCategory = asyncHandler(async (req, res, next) => {
  try {
    const { name } = req.body;

    await categoryRepository.createCategory({ name });
    res
      .status(201)
      .json({ success: true, message: "Successfully created category" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const updateCategory = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    const category = await categoryRepository.updateCategory(id, { name });
    if (category) {
      res.status(200).json(category);
    } else {
      next(new ErrorResponse("Category doesnt exist with id", 404));
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const deleteCategory = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const success = await categoryRepository.deleteCategory(id);
    if (success) {
      res.status(200).json({ message: "category deleted successfully" });
    } else {
      next(new ErrorResponse("Category doesnt exist with id", 404));
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  getAllCategory,
  getCategoryByID,
  createCategory,
  updateCategory,
  deleteCategory,
};
