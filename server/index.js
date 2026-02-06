const express = require("express");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cartRoutes = require("./routes/cartRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Routes

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to PERN Shop Sphere API" });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
