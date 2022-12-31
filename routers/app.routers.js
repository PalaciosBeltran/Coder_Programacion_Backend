const express = require('express');
const productsTestRoutes = require('./products/products.test.routes');
//const productsRoutes = require('./products/products.routes');
//const messagesRoutes = require('./messages/messages.routes');

const router = express.Router();

//router.use('/productos' , productsRoutes);
router.use('/productos-test' , productsTestRoutes);
//router.use('/mensajes', messagesRoutes);

module.exports = router;