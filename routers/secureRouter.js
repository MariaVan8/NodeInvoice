const express = require("express");
const secureRouter = express.Router();
const SecureController = require("../controllers/SecureController");
secureRouter.get("/secure-area", SecureController.Index);
secureRouter.get("/admin-area", SecureController.Admin);
secureRouter.get("/manager-area", SecureController.Manager);
module.exports = secureRouter;
