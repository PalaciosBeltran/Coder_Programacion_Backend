const { Schema } = require('mongoose');
const MongoContainer = require('../../containers/container.mongo');
// const { createFakeProducts } = require('../../faker.products');

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

    // populate(qty= 5){
    //     this.products = [];
    //     for(let i = 1; i<=qty ; i++){
    //         const newProduct = createFakeProducts();
    //         this.products.push(newProduct);            
    //     }
    //     return this.products;
    // }
}

module.exports = ProductsMongoDao;