const express = require('express');
const productsRoutes = require('./products/products.routes');
const router = express.Router();

// Middlewares
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//Routes
router.use('/' , productsRoutes);

module.exports = router;