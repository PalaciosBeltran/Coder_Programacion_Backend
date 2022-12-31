const { Schema } = require('mongoose');
const MongoContainer = require('../../containers/container.mongo');

const collection = 'socket-messages';

const messagesSchema = new Schema({
    author: {
        emailId: {type: String},
        name: {type: String},
        lastname: {type: String},
        age: {type: Number},
        alias: {type: String},
        avatar: {type: String}
    },
    time: {type: String},
    message: {type: String}
});

class MessagesMongoDao extends MongoContainer {
    constructor(){
        super(collection, messagesSchema);
    }
}

module.exports = MessagesMongoDao;