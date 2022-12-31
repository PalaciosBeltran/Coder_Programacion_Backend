const Products = require('../../models/daos/products/products.mongo.dao');
const products = new Products();

const SocketProductsConfig = async (socket, sockets) => {
    socket.emit('products', await products.importInfo());

    socket.on('newProduct', async newProduct => {
        await products.save(newProduct);
        sockets.emit('products', await products.importInfo());
    })
}

module.exports = SocketProductsConfig;