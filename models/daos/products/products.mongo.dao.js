const { Schema } = require('mongoose');
const MongoContainer = require('../../containers/container.mongo');

const collection = 'socket-products';

const productsSchema = new Schema({
    title: {type: String},
    price: {type: Number},
    thumbnail: {type: String}
});

class ProductsMongoDao extends MongoContainer {
    constructor(){
        super(collection, productsSchema);
    }
}

module.exports = ProductsMongoDao;