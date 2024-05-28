const Brand = require("../models/brands");

async function getBrand() {
  return await Brand.findAll();
}
async function getBrandById(id) {
  return await Brand.findByPk(id);
}
async function createBrand(brandData) {
  return await Brand.create(brandData);
}
async function updateBrand(id, updateData) {
  const brand = await Brand.findByPk(id);
  if (brand) {
    updateBrand = await brand.update(updateData);
    return updateBrand;
  } else {
    console.log("Brand not found");
    return null;
  }
}
async function deleteBrand(id) {
  const brand = await Brand.findByPk(id);
  if (brand) {
    await brand.destroy();
    return true;
  } else {
    return false;
  }
}

module.exports = {
  getBrand,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
};
