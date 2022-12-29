const { normalize, schema } = require('normalizr');

// const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });
// const schemaMensaje = new schema.Entity('post', { author: schemaAuthor }, { idAttribute: 'id' })
// const schemaMensajes = new schema.Entity('posts', { mensajes: [schemaMensaje] }, { idAttribute: 'id' })

// const normalizarMensajes = (messages) => normalize({ id: 'mensajes', mensajes: messages }, schemaMensajes)

const authorSchema = new schema.Entity('author', {}, { idAttribute: 'email' });
const messagesSchema = new schema.Entity('messages', {authors: authorSchema}, { idAttribute: 'id' });
const postsSchema = new schema.Entity('posts', {messages: [messagesSchema]}, { idAttribute: 'id' });
const normalizedMessages = (messages) => normalize({ id: 'mensajes', mensajes: messages }, postsSchema);

module.exports = { normalizedMessages };