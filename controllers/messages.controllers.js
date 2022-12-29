const { MessagesDao } = require('../models/daos/app.daos');
const { HTTP_STATUS } = require('../constants/api.constants');
const { successResponse } = require('../utils/api.utils');

const messagesDao = new MessagesDao();

const getMessages = async (req, res) => {
    let messages = await messagesDao.importInfo();
    let response = successResponse(messages);
    return res.status(HTTP_STATUS.OK).json(response);
    //return messages;
}

const messagesController = { getMessages }
module.exports = messagesController;
