const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbSequelize.js");
const Category = require("./categories.js");
const Brand = require("./brands.js");

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  offerPrice: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: "id",
    },
    allowNull: false,
  },
  brandId: {
    type: DataTypes.INTEGER,
    references: {
      model: Brand,
      key: "id",
    },
    allowNull: false,
  },
});

Product.belongsTo(Category, { foreignKey: "categoryId" });
Product.belongsTo(Brand, { foreignKey: "brandId" });

module.exports = Product;
