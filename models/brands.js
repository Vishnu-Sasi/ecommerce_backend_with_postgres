const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbSequelize");

const Brand = sequelize.define("Brand", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Brand;
