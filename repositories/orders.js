const { Order, OrderLineItem } = require("../models/orders");
const pool = require("../config/db.js");
const orderQueries = require("../queries/orders");

async function getAllOrders() {
  return Order.findAll({
    include: [
      {
        model: OrderLineItem,
        as: "orderlineItems",
      },
    ],
  });
}

async function getOrderById(id) {
  return Order.findByPk(id, {
    include: [
      {
        model: OrderLineItem,
        as: "orderlineItems",
      },
    ],
  });
}

async function createOrder(orderData) {
  return Order.create(orderData);
}

async function createOrderLineItem(orderLineData) {
  return OrderLineItem.create(orderLineData);
}

async function updateOrder(orderId, updateData) {
  const order = await Order.findByPk(orderId);
  if (order) {
    const updatedOrder = await order.update(updateData);
    return updatedOrder;
  } else {
    console.log("Order not found");
    return null;
  }
}

async function updateOrderLine(orderLineId, updateData) {
  const orderLineItem = await OrderLineItem.findByPk(orderLineId);
  if (orderLineItem) {
    const updatedOrderLineItem = await orderLineItem.update(updateData);
    return updatedOrderLineItem;
  } else {
    console.log("Order line item not found");
    return null;
  }
}

async function deleteOrderAndLineItems(orderId) {
  return new Promise(async (resolve, reject) => {
    try {
      await pool.query(orderQueries.deleteLineItems, [orderId]);
      await pool.query(orderQueries.deleteOrder, [orderId]);
      resolve({ message: "Order and order line items deleted successfully" });
    } catch (error) {
      reject(error);
    }
  });
}

async function deleteLineItems(orderId) {
  return new Promise(async (resolve, reject) => {
    try {
      await pool.query(orderQueries.deleteLineItems, [orderId]);
      resolve({ message: "Order and order line items deleted successfully" });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  createOrderLineItem,
  updateOrder,
  updateOrderLine,
  deleteOrderAndLineItems,
  deleteLineItems,
};
