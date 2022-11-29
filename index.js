const Products = require('./models/daos/products/products.mongo.dao');
const Messages = require('./models/daos/messages/messages.mongo.dao');
const { formatMessage } = require('./utils/utils');
const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io');

const session = require('express-session');
const MongoStore = require('connect-mongo');

const config = require('./databases/databases.config');

const authWebRouter = require('./routers/web/auth');
const homeWebRouter = require('./routers/web/home');

const app = require("./app");
const PORT = process.env.PORT || 8080;

const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

const products = new Products();
const messages = new Messages();

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(session({
    store: MongoStore.create({ mongoUrl: config.remoteMongodb.uri }),
    secret: '123456789Secret',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 60000
    }
}))

app.use(authWebRouter);
app.use(homeWebRouter);

const envConfig = require('./config');
const DATASOURCE_BY_ENV = {
    localMongo: require('./models/containers/container.mongo'),
    remoteMongo: require('./models/containers/container.mongo')
};
const dataSource = DATASOURCE_BY_ENV[envConfig.DATASOURCE];

const users = [];

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

    socket.emit('products', await products.importInfo());

    socket.on('newProduct', (async newProduct =>{
    await products.save(newProduct)
    .then(async () => {
        io.sockets.emit('products', await products.importInfo());
        })    
    }))

    socket.emit('message', await messages.importInfo());

    socket.on('newUser', (author) =>{
        const newUser = {
            id: socket.id,
            author: author,
        }
        users.push(newUser);
    });

    socket.on("newMessage", (async data =>{
        const user = await users.find(user => user.id === socket.id)
        const newMessage = formatMessage(socket.id, user.author, data);
        messages.save(newMessage);
        io.emit('chatMessage', newMessage);
    }));

});