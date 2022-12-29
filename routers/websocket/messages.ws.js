const Messages = require('../../models/daos/messages/messages.mongo.dao');
const { formatMessage } = require ('../../utils/utils')
const messages = new Messages();

const SocketMessagesConfig = async (socket, sockets) => {
    socket.emit('message', await messages.importInfo());

    socket.on("newMessage", (async newMessage => {
        const formatedMessage = formatMessage(newMessage.author, newMessage.message);
        await messages.save(formatedMessage);
        sockets.emit('message', await messages.importInfo());
    }));
}

module.exports = SocketMessagesConfig;