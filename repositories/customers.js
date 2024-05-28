const Customer = require("../models/customers");
const customerQueries = require("../queries/customers");
const pool = require("../config/db");

async function getCustomer() {
  return await Customer.findAll();
}
async function getCustomerById(id) {
  return await Customer.findByPk(id);
}

async function getCustomerByEmail(email) {
  try {
    const user = await Customer.findOne({ where: { email: email } });
    return user;
  } catch (error) {
    console.error("Error retrieving user by email:", error);
    throw error;
  }
}

async function createCustomer(customerData) {
  return await Customer.create(customerData);
}

async function updateCustomer(id, updateData) {
  try {
    const customer = await Customer.findByPk(id);
    if (customer) {
      const updatedCustomer = await customer.update(updateData);
      return updatedCustomer;
    } else {
      return null; // Indicate customer not found
    }
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error; // Re-throw for handling in the controller
  }
}

async function deleteCustomer(id) {
  const customer = await Customer.findByPk(id);
  if (customer) {
    await customer.destroy();
    return true;
  } else {
    return false;
  }
}

const getSingleCustomerRolesById = (customerid) => {
  return new Promise((resolve, reject) => {
    pool.query(
      customerQueries.getCustomerRolesById,
      [customerid],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows);
        }
      }
    );
  });
};

module.exports = {
  getCustomer,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerByEmail,
  getSingleCustomerRolesById,
};
