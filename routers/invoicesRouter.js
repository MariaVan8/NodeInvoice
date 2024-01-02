const InvoiceController = require("../controllers/InvoiceController");

const fs = require("fs").promises;
const path = require("path");

const express = require("express");
const invoicesRouter = express.Router();

// construct the path to our data folder
const dataPath = path.join(__dirname, "../data/");

// Show listing of all clients
invoicesRouter.get("/", InvoiceController.Index);

// Show Create Client Form
invoicesRouter.get("/create", InvoiceController.Create);
// Handle Create Client Form Submission
invoicesRouter.post("/create", InvoiceController.CreateInvoice);


// Show Individual Client Details
invoicesRouter.get("/:id", InvoiceController.Detail);

// Delete an Individual Client
invoicesRouter.get("/:id/delete", InvoiceController.DeleteInvoiceById);

module.exports = invoicesRouter;
