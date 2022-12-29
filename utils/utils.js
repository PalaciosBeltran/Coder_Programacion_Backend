const moment = require("moment/moment");

const formatMessage = (author, messageData) => {
    const message = {
        author: {
            emailId: author.emailId,
            name: author.name,
            lastname: author.lastname,
            age: author.age,
            alias: author.alias,
            avatar: author.avatar
        },
        time: moment().format('"DD/MM/YYYY - HH:mm"'),
        message: messageData
    }
    return message;
};

module.exports = {
    formatMessage
};