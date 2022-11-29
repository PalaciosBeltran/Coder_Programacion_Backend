const envConfig = require('../../config');

let ProductsDao;
let MessagesDao;

switch(envConfig.DATASOURCE){
    case 'localMongo':
        ProductsDao = require('./products/products.mongo.dao');
        MessagesDao = require('./messages/messages.mongo.dao');
        break;
    case 'remoteMongo':
        ProductsDao = require('./products/products.mongo.dao');
        MessagesDao = require('./messages/messages.mongo.dao');
        break;
    default:
        throw new Error('Datasource inválido');
}

module.exports = {
    ProductsDao,
    MessagesDao
}