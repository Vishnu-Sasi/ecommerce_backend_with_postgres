const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbSequelize.js");
const Product = require("./products.js");
const Customer = require("./customers.js");

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  customerId: {
    type: DataTypes.INTEGER,
    references: {
      model: Customer,
      key: "id",
    },
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
});
Order.belongsTo(Customer, {
  foreignKey: "customerId",
  as: "customer",
});

Customer.hasMany(Order, {
  foreignKey: "customerId",
  as: "orders",
});

const OrderLineItem = sequelize.define("OrderLineItem", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  orderId: {
    type: DataTypes.INTEGER,
    references: {
      model: Order,
      key: "id",
    },
    allowNull: false,
  },
});

Order.hasMany(OrderLineItem, {
  foreignKey: "orderId",
  as: "orderlineItems",
});
OrderLineItem.belongsTo(Order, {
  foreignKey: "orderId",
  as: "order",
});

module.exports = {
  Order,
  OrderLineItem,
};
