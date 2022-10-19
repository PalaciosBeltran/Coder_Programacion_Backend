const dbConfig = require('../config');
const knex = require('knex')(dbConfig.sqlite);

class Messages{
    constructor(tableName){
        this.tableName = tableName;
        //this.knex = knex(dbConfig.sqlite);
    }

    async createTable(){
        const exist = await knex.schema.hasTable(this.tableName);
        if(exist){
            await knex.schema.dropTable(this.tableName);
        }
        return await knex.schema.createTable(this.tableName, (table) => {
            table.increments('id'); // Primary key
            table.string('username').notNullable();
            table.float('time').notNullable();
            table.string('text').notNullable();
        });
        
    }

    async getAllMessages(){
        try{
            const exist = await knex.schema.hasTable(this.tableName);
            if(!exist){
                (async () => {
                    try {
                        await this.createTable();
                        console.log('table created');
                    }
                    catch(error){
                        console.log(error);
                    }
                })();
            }
            const messages = await knex.from(this.tableName).select('id', 'username', 'time', 'text');
            return messages;
        }
        catch(error){
            console.log(error);
        }
    }

    async insertNewMessage(message){
        try{
            const exist = await knex.schema.hasTable(this.tableName);
            if(!exist){
                (async () => {
                    try {
                        await this.createTable();
                        console.log('table created');
                    }
                    catch(error){
                        console.log(error);
                    }
                })();
            }
            const { username, time, text } = message;
            const newMessage = await knex(this.tableName).insert({username: username, time: time, text: text});
            return newMessage;
        }
        catch(error){
            console.log(error);
        }
    }
}

module.exports = Messages;
