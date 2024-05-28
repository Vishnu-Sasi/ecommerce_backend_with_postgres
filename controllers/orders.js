const orderRepository = require("../repositories/orders");
const orderService = require("../services/orderService");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/asyncHandler");

const getAllOrder = asyncHandler(async (req, res) => {
  try {
    const orders = await orderRepository.getAllOrders();
    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const order = await orderRepository.getOrderById(id);
    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const createOrder = asyncHandler(async (req, res) => {
  try {
    console.log("Received request body:", req.body);

    const { orderDate, customerId, orderLineItems } = req.body;

    if (!orderLineItems || !Array.isArray(orderLineItems)) {
      console.log("Invalid or missing order line items:", orderLineItems);
      return res
        .status(400)
        .json({ error: "Invalid or missing order line items" });
    }

    const totalAmount = orderService.calculateTotalAmount(orderLineItems);

    const orderData = { orderDate, customerId, totalAmount };

    const order = await orderRepository.createOrder(orderData);

    const orderLineItemPromises = orderLineItems.map((lineItem) => {
      lineItem.orderId = order.id;
      return orderRepository.createOrderLineItem(lineItem);
    });

    await Promise.all(orderLineItemPromises);

    res
      .status(201)
      .json({ message: "Successfully created order", orderId: order.id });
  } catch (error) {
    console.error("Error in createOrder:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const updateOrder = asyncHandler(async (req, res) => {
  try {
    console.log("Received request body for updating order:", req.body);

    const orderId = req.params.id;
    const { orderDate, customerId, orderLineItems } = req.body;

    if (!orderLineItems || !Array.isArray(orderLineItems)) {
      console.log("Invalid or missing order line items:", orderLineItems);
      return res
        .status(400)
        .json({ error: "Invalid or missing order line items" });
    }

    const totalAmount = orderService.calculateTotalAmount(orderLineItems);

    const orderData = { orderDate, customerId, totalAmount };

    const order = await orderRepository.updateOrder(orderId, orderData);

    await orderRepository.deleteLineItems(orderId);

    const orderLineItemPromises = orderLineItems.map((lineItem) => {
      lineItem.orderId = orderId; // Set the orderId for each line item
      return orderRepository.createOrderLineItem(lineItem);
    });

    await Promise.all(orderLineItemPromises);

    res
      .status(200)
      .json({ message: "Order updated successfully", orderId: order.id });
  } catch (error) {
    console.error("Error in updateOrder:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const deleteOrder = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const success = await orderRepository.deleteOrderAndLineItems(id);
    if (success) {
      res.status(200).json({ message: "Order deleted successfully" });
    } else {
      next(new ErrorResponse("Order doesnt exist with id", 404));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  getAllOrder,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
