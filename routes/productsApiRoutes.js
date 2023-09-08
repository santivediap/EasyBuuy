const express = require('express');

// Rutas de productos
const productsApiController = require("../controllers/productsApiControllers");
const productsApiRouter = express.Router();

productsApiRouter.post('/', productsApiController.searchProducts);

module.exports = productsApiRouter;