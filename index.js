const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io');
const {engine} = require('express-handlebars');
const path = require('path');

const productsSocket = require ('./routers/websocket/products.ws');
const messagesSocket = require ('./routers/websocket/messages.ws');

const session = require('express-session');
const MongoStore = require('connect-mongo');

const config = require('./databases/databases.config');

const authWebRouter = require('./routers/web/auth');
const homeWebRouter = require('./routers/web/home');

const app = require("./app");
const PORT = process.env.PORT || 8080;

const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

// const products = new Products();
// const messages = new Messages();

app.set('views', './views');
app.set('view engine', 'hbs');
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'home.hbs',
    layoutsDir: path.resolve(__dirname, './views/pages' ),
    partialsDir: path.resolve(__dirname, './views/partials')
  }));

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

//const users = [];

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