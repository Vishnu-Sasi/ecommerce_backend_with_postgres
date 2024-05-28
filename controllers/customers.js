const customerRepository = require("../repositories/customers");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/asyncHandler");
const {
  hashPassword,
  compareWithHashedPassword,
} = require("../utils/passwordHelper");
const { createToken } = require("../utils/jwtHelper");

const getAllCustomer = asyncHandler(async (req, res, next) => {
  try {
    const customers = await customerRepository.getCustomer();
    return res.status(200).json({ success: true, data: customers });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const getCustomerById = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const customer = await customerRepository.getCustomerById(id);
    if (customer) {
      return res.status(200).json({ success: true, data: customer });
    } else {
      next(new ErrorResponse("Product doesnt exist with id", 404));
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const loginCustomer = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const users = await customerRepository.getCustomerByEmail(email);
  if (!users || users.length == 0) {
    return next(new ErrorResponse("invalid credentials", 400));
  }

  console.log(users);
  const isValid = compareWithHashedPassword(password, users.password);

  if (isValid) {
    const token = createToken(users.id);
    return res.status(200).json({
      success: true,
      data: {
        message: "login successfull",
        user: {
          name: users.name,
        },
        token: token,
      },
    });
  }

  return next(new ErrorResponse("invalid credentials", 400));
});

const createCustomer = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = hashPassword(password);

    const user = await customerRepository.getCustomerByEmail(email);
    console.log(`user from create user ${user}`);
    if (user) {
      return next(new ErrorResponse(`email ${email} already taken`, 400));
    }
    const customer = await customerRepository.createCustomer({
      name,
      email,
      password: hashedPassword,
    });
    const token = createToken(customer.id);
    res.status(201).json({
      success: true,
      message: "Successfully created customer",
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const updateCustomer = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, email, password } = req.body;

    const hashedPassword = hashPassword(password);

    const updatedCustomer = await customerRepository.updateCustomer(id, {
      name,
      email,
      password: hashedPassword,
    });

    if (updatedCustomer) {
      res.status(200).json(updatedCustomer);
    } else {
      next(new ErrorResponse("Customer doesn't exist with id", 404));
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const deleteCustomer = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const success = await customerRepository.deleteCustomer(id);
    if (success) {
      res.status(200).json({ message: "Customer deleted successfully" });
    } else {
      next(new ErrorResponse("Customer doesnt exist with id", 404));
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  getAllCustomer,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  loginCustomer,
};
