const environmentConfig = require('../config');

const localMongoDATABASE = 'ecommerce';

module.exports = {
    localMongodb: {
        uri: `mongodb://localhost:27017/${localMongoDATABASE}`,
    },

    remoteMongodb: {
        uri: `mongodb://Edujpb:${environmentConfig.DB_PASSWORD}@ac-tc3hjqb-shard-00-00.mrunyil.mongodb.net:27017,ac-tc3hjqb-shard-00-01.mrunyil.mongodb.net:27017,ac-tc3hjqb-shard-00-02.mrunyil.mongodb.net:27017/?ssl=true&replicaSet=atlas-ndw8j0-shard-0&authSource=admin&retryWrites=true&w=majority`,
    }
}