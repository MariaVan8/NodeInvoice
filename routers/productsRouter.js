const ProductController = require("../controllers/ProductController");

const fs = require("fs").promises;
const path = require("path");

const express = require("express");
const productsRouter = express.Router();

// construct the path to our data folder
const dataPath = path.join(__dirname, "../data/");

// Show listing of all products
productsRouter.get("/", ProductController.Index);

// Show Create Product Form
productsRouter.get("/create", ProductController.Create);
// Handle Create Product Form Submission
productsRouter.post("/create", ProductController.CreateProduct);

// Show Create Product Form
productsRouter.get("/edit/:id", ProductController.Edit);
// Handle Create Product Form Submission
productsRouter.post("/edit/:id", ProductController.EditProduct);

// Show Individual Product Details
productsRouter.get("/:id", ProductController.Detail);

// Delete an Individual Product
productsRouter.get("/:id/delete", ProductController.DeleteProductById);

module.exports = productsRouter;
