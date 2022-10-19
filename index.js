const express = require('express');
const path = require('path');
const dbConfig = require('./db/config');
const Products = require('./model/products');
const Messages = require('./db/clients/sql.clients');
const { formatMessage } = require('./utils/utils');
const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io');

const app = express();
const PORT = process.env.PORT || 8080;

const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);
const products = new Products('products');
const messages = new Messages('ecommerce');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, './public')));

//const messages = [];
const users = [];

io.on('connection', async (socket) => {
    console.log(`User ${socket.id} connected`);

    socket.emit('products', await products.getAll());

    socket.on('newProduct', (async newProduct =>{
    await products.save(newProduct)
    .then(async () => {
        io.sockets.emit('products', await products.getAll());
        })    
    }))

    socket.emit('message', await messages.getAllMessages());

    socket.on('newUser', (username) =>{
        const newUser = {
            id: socket.id,
            username: username,
        }
        users.push(newUser);
    });

    socket.on("newMessage", (async data =>{
        const user = await users.find(user => user.id === socket.id)
        const newMessage = formatMessage(socket.id, user.username, data);
        messages.insertNewMessage(newMessage);
        io.emit('chatMessage', newMessage);
    }));

});

const connectedServer = httpServer.listen(PORT, ()=> {
    console.log(`Server is up and running on port ${PORT}`);
});
  
connectedServer.on('error', (error) => {
console.error('Error: ', error);
});