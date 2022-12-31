const express = require('express');
const messagesControllers = require('../../controllers/messages.controllers');

const router = express.Router();

router.get('/', messagesControllers.getMessages);

module.exports = router;
