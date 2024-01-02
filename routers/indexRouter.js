/*
 * File: c:\Users\jsolomon11\JBS\Courses\SSD\Intake29\3100-NodeJS\assignments\solutions\SSD-3100-Node-A01-ExpressYourself\routers\indexRouter.js
 * Created Date: Wednesday, November 15th 2023, 10:43:54 pm
 * Author: Josh Solomon
 * Copyright (c) 2023 Josh Solomon
 * ------------------------------------
 */

const express = require("express");
const indexRouter = express.Router();
const IndexController = require("../controllers/IndexController");

// indexRouter.get("/", (req, res) => {
//   res.render("index", { title: "Mongo Crud - Home Page" });
// });

// GET home page
indexRouter.get("/", IndexController.Index);


module.exports = indexRouter;
