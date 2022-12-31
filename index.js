const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io');

const productsSocket = require ('./routers/websocket/products.ws');
const messagesSocket = require ('./routers/websocket/messages.ws');

const app = require("./app");
const PORT = process.env.PORT || 8080;

const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

const envConfig = require('./config');
const DATASOURCE_BY_ENV = {
    localMongo: require('./models/containers/container.mongo'),
    remoteMongo: require('./models/containers/container.mongo')
};
const dataSource = DATASOURCE_BY_ENV[envConfig.DATASOURCE];

httpServer.listen(PORT, () => {
    if(envConfig.DATASOURCE == 'localMongo' || envConfig.DATASOURCE == 'remoteMongo'){
      dataSource.connect().then(() => {
        console.log(`Server is up and running on port ${PORT}.`);
        console.log(`Data persistence provided via ${envConfig.DATASOURCE}.`);
      })
    }
    else{
      console.log(`Server is up and running on port ${PORT}.`);
      console.log(`Data persistence provided via ${envConfig.DATASOURCE}.`);
    }
});

io.on('connection', async (socket) => {
    console.log(`User ${socket.id} connected`);
    productsSocket(socket, io.sockets);
    messagesSocket(socket, io.sockets);
});



