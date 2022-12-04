const moment = require("moment/moment");

const formatMessage = (id, author, message) => {
    const emailId = author.id;
    const name = author.nombre;
    const lastname = author.apellido;
    const age = author.edad;
    const alias = author.alias;
    const avatar = author.avatar;
    return{
        author: {
            emailId,
            name,
            lastname,
            age,
            alias,
            avatar
        },
        time: moment().format('"DD/MM/YYYY - HH:mm"'),
        message
    }
};

module.exports = {
    formatMessage
};