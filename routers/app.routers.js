const express = require('express');
const productsRoutes = require('./products/products.routes');
const messagesRoutes = require('./messages/messages.routes');

const router = express.Router();

router.use('/productos' , productsRoutes);
router.use('/mensajes', messagesRoutes);

module.exports = router;