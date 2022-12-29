const Products = require('../../models/daos/products/products.mongo.dao');
const products = new Products();

let nProduct = undefined;

const SocketProductsConfig = async (socket, sockets) => {
    socket.emit('products', await products.importInfo());

    socket.on('newProduct', async newProduct => {
        nProduct = newProduct;
        await products.save(newProduct);
        sockets.emit('products', await products.importInfo());
        return nProduct;
    })
}

module.exports = { SocketProductsConfig , nProduct};