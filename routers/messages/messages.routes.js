const express = require('express');
const messagesControllers = require('../../controllers/messages.controllers');

const router = express.Router();

router.get('/', messagesControllers.getMessages);
router.get('/normalizados', messagesControllers.getNormalizedMessages);

module.exports = router;
