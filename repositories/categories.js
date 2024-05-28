const Category = require("../models/categories");

async function getCategory() {
  return await Category.findAll();
}
async function getCategoryByID(id) {
  return await Category.findByPk(id);
}
async function createCategory(categoryData) {
  return await Category.create(categoryData);
}
async function updateCategory(id, updateData) {
  const category = await Category.findByPk(id);
  if (category) {
    updateCategory = await category.update(updateData);
    return updateCategory;
  } else {
    console.log("Category not found");
    return null;
  }
}
async function deleteCategory(id) {
  const category = await Category.findByPk(id);
  if (category) {
    await category.destroy();
    return true;
  } else {
    return false;
  }
}

module.exports = {
  getCategory,
  getCategoryByID,
  createCategory,
  updateCategory,
  deleteCategory,
};
