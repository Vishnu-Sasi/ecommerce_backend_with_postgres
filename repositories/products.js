const Product = require("../models/products.js");
const pool = require("../config/db.js");
const productQueries = require("../queries/products");

async function getAllProduct() {
  return new Promise((resolve, reject) => {
    pool.query(productQueries.getAllProductQuery, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
}

async function getProductById(id) {
  return new Promise((resolve, reject) => {
    pool.query(productQueries.getOneProductQuery, [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
}

async function createProduct(productData) {
  return await Product.create(productData);
}

async function updateProduct(id, updateData) {
  const product = await Product.findByPk(id);
  if (product) {
    updateProduct = await product.update(updateData);
    return updateProduct;
  } else {
    console.log("Product not found");
    return null;
  }
}

async function deleteProduct(id) {
  const product = await Product.findByPk(id);
  if (product) {
    await product.destroy();
    return true;
  } else {
    return false;
  }
}

module.exports = {
  getAllProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
