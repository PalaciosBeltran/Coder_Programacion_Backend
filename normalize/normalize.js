const { normalize, schema } = require('normalizr');

const authorSchema = new schema.Entity('author', {}, { idAttribute: 'email' });
const messagesSchema = new schema.Entity('messages', {authors: authorSchema}, { idAttribute: 'id' });
const postsSchema = new schema.Entity('posts', {messages: [messagesSchema]}, { idAttribute: 'id' });
const normalizedMessages = (messages) => normalize({ id: 'mensajes', mensajes: messages }, postsSchema);

module.exports = { normalizedMessages };