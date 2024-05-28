const express = require("express");
require("dotenv").config({ path: "./config/config.env" });
const sequelize = require("./config/dbSequelize");
const errorHandler = require("./middlewares/errorHandler");

const Category = require("./models/categories");
const Brand = require("./models/brands");
const Product = require("./models/products");
const Customer = require("./models/customers");
const Order = require("./models/orders");

const categoryRoutes = require("./routes/categories");
const brandRoutes = require("./routes/brands");
const productRoutes = require("./routes/products");
const customerRoutes = require("./routes/customers");
const orderRoutes = require("./routes/orders");

const app = express();

const PORT = process.env.PORT || 9000;

app.use(express.json());

app.use("/categories", categoryRoutes);
app.use("/brands", brandRoutes);
app.use("/products", productRoutes);
app.use("/customers", customerRoutes);
app.use("/orders", orderRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
