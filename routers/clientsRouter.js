const ClientController = require("../controllers/ClientController");

const fs = require("fs").promises;
const path = require("path");

const express = require("express");
const clientsRouter = express.Router();

// construct the path to our data folder
const dataPath = path.join(__dirname, "../data/");

// Show listing of all clients
clientsRouter.get("/", ClientController.Index);

// Show Create Client Form
clientsRouter.get("/create", ClientController.Create);
// Handle Create Client Form Submission
clientsRouter.post("/create", ClientController.CreateClient);

// Show Create Client Form
clientsRouter.get("/edit/:id", ClientController.Edit);
// Handle Create Client Form Submission
clientsRouter.post("/edit/:id", ClientController.EditClient);

// Show Individual Client Details
clientsRouter.get("/:id", ClientController.Detail);

// Delete an Individual Client
clientsRouter.get("/:id/delete", ClientController.DeleteClientById);

module.exports = clientsRouter;
