const dbConfig = require('../db/config');
const knex = require('knex')(dbConfig.mariaDB);

class Products{
    constructor(tableName){
        this.tableName = tableName;
    }
  
    async getAll(){
        try{
            let products = JSON.parse(JSON.stringify(await knex.from(this.tableName).select('id','title', 'thumbnail', 'price' )));
            return products;
        }
        catch (error){
            console.log(error);
        }
    }
  
    async save(prod){
        const { title, price, thumbnail } = prod;
        if ( !title || !price || !thumbnail ) return { error: 'Formato de cuerpo incorrecto' };
        const newProduct = await knex(this.tableName).insert({title: title, price: price, thumbnail: thumbnail});
        return newProduct;
    }
}
  
  module.exports = Products;