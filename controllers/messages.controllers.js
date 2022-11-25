const { MessagesDao } = require('../models/daos/app.daos');
const { HTTP_STATUS } = require('../constants/api.constants');
const { successResponse } = require('../utils/api.utils');
const normalizr = require('normalizr');
const normalize = normalizr.normalize;
const schema = normalizr.schema;
const util = require('util');

const messagesDao = new MessagesDao();

const getMessages = async (req, res) => {
    let messages = await messagesDao.importInfo();
    let response = successResponse(messages);
    return res.status(HTTP_STATUS.OK).json(response);
}

const getNormalizedMessages = async (req, res) => {
    const messages = await messagesDao.importInfo();
    //
    const authorSchema = new schema.Entity('authors');
    const messagesSchema = new schema.Entity('messages', {
        authors: authorSchema
    });
    const posts = new schema.Entity('mensajes', {
        messages: [messagesSchema]
    })
    const normalizedMessages = normalize(messages, posts);
    console.log('Original comments =>', JSON.stringify(messages).length)
    console.log('Normalized comments =>', JSON.stringify(normalizedMessages).length);
    //console.log(util.inspect(normalizedMessages, false, 12, true));
    return res.status(HTTP_STATUS.OK).json(normalizedMessages);
}

const getCompression = async(req, res) => {
    const messages = await messagesDao.importInfo();
    const authorSchema = new schema.Entity('authors');
    const messagesSchema = new schema.Entity('messages', {authors: authorSchema});
    const posts = new schema.Entity('mensajes', {messages: [messagesSchema]})
    const normalizedMessages = normalize(messages, posts);
    const compression = `${(JSON.stringify(normalizedMessages).length / JSON.stringify(messages).length)*100}%`;
    return compression;
}

const messagesController = { getMessages, getNormalizedMessages, getCompression}
module.exports = messagesController;
