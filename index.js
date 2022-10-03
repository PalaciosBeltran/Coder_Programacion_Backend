const express = require('express');
const path = require('path');
const Products = require('./model/products');
const { formatMessage } = require('./utils/utils');
const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io');

const app = express();
const PORT = process.env.PORT || 8080;

const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);
const products = new Products();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, './public')));

const messages = [];
const users = [];

io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`);

    socket.emit('products', products.getAll());

    socket.on('newProduct', (newProduct =>{
        products.save(newProduct);
        io.sockets.emit('products', products.getAll());
    }))

    socket.emit("message", [...messages]);

    socket.on('newUser', (username) =>{
        const newUser = {
            id: socket.id,
            username: username,
        }
        users.push(newUser);
    });

    socket.on("newMessage", (data) =>{
        const user = users.find(user => user.id === socket.id);
        const newMessage = formatMessage(socket.id, user.username, data);
        messages.push(newMessage);
        io.emit('chatMessage', newMessage);
    });

});

const connectedServer = httpServer.listen(PORT, ()=> {
    console.log(`Server is up and running on port ${PORT}`);
});
  
connectedServer.on('error', (error) => {
console.error('Error: ', error);
});