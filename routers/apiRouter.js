const fs = require("fs").promises;
const path = require("path");

const express = require("express");
const apiRouter = express.Router();

const dataPath = path.join(__dirname, "../data/");

apiRouter.get("/clients", (req, res) => {
  fs.readFile(dataPath + "clients.json")
    .then((contents) => {
      console.log(contents);
      // need to parse the raw buffer as json if we want to work with it
      const clientsJson = JSON.parse(contents);
      console.log(clientsJson);
      //   prepare and send an OK response
      res.json(clientsJson);
    })
    .catch((err) => {
      console.log(err);
      res.writeHead(500);
      res.end("Error");
    });
});
apiRouter.get("/clients/:id", (req, res) => {
  fs.readFile(dataPath + "clients.json")
    .then((contents) => {
      console.log(contents);
      // need to parse the raw buffer as json if we want to work with it
      const clientsJson = JSON.parse(contents);
      const clientJson = clientsJson
        .filter((client) => client.id === req.params.id)
        .shift();
      console.log(clientJson);
      //   prepare and send an OK response
      res.json(clientJson);
    })
    .catch((err) => {
      console.log(err);
      res.writeHead(500);
      res.end("Error");
    });
});

apiRouter.get("/products", (req, res) => {
  fs.readFile(dataPath + "products.json")
    .then((contents) => {
      console.log(contents);
      // need to parse the raw buffer as json if we want to work with it
      const productsJson = JSON.parse(contents);
      console.log(productsJson);
      //   prepare and send an OK response
      res.json(productsJson);
    })
    .catch((err) => {
      console.log(err);
      res.writeHead(500);
      res.end("Error");
    });
});
apiRouter.get("/products/:id", (req, res) => {
  fs.readFile(dataPath + "products.json")
    .then((contents) => {
      console.log(contents);
      // need to parse the raw buffer as json if we want to work with it
      const productsJson = JSON.parse(contents);
      const productJson = productsJson
        .filter((product) => product.id === req.params.id)
        .shift();
      console.log(productJson);
      //   prepare and send an OK response
      res.json(productJson);
    })
    .catch((err) => {
      console.log(err);
      res.writeHead(500);
      res.end("Error");
    });
});

module.exports = apiRouter;
