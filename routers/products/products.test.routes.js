const express = require('express');
const productsController = require('../../controllers/products.controllers');

const router = express.Router();

router.get('/', productsController.getFakeProducts);

module.exports = router;