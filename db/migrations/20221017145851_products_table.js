const dbConfig = require('../config');
const knex = require('knex')(dbConfig.mariaDB);
const defaultProducts = require('../../model/default.products');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

module.exports.up = async function(knex) {
    const exist = await knex.schema.hasTable('products'); 
    if(!exist){
            return knex.schema.createTable('products', (table) => {
            table.increments('id'); // Primary key
            table.string('title').notNullable();
            table.string('thumbnail').notNullable();
            table.integer('price').notNullable();
            (async () => {
                try{
                    await knex('products').insert(defaultProducts);
                    console.log('default products loaded succesfully!');
                    products = await knex.from('products').select('*');
                }
                catch (error){
                    console.log(error);
                }
                finally{
                    knex.destroy();
                }
            })();
        });
    }
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

module.exports.down = async function(knex) {
    const exist = await knex.schema.hasTable('products');
    if(exist){
        return knex.schema.dropTable('products')
    }  
};
