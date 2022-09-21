const express = require('express');
const path = require('path');
const {engine} = require('express-handlebars');
const apiRoutes = require('./routers/app.routers');
const Products = require('./model/Products');

const app = express();
const PORT = process.env.PORT || 8080;
const products = new Products();

app.set('views', './views');
app.set('view engine', 'hbs');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, './public')));

app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main.hbs',
  layoutsDir: path.resolve(__dirname, './views/layouts' ),
  partialsDir: path.resolve(__dirname, './views/partials/')
}));

// Routes
app.use('/api' , apiRoutes);

app.get('/productos', (req, res) => {
  res.render('index', {products: products.getAll()})
});

app.post('/productos', (req, res) => {
  products.save(req.body);
  res.redirect('/productos');
});

const connectedServer = app.listen(PORT, ()=> {
  console.log(`Server is up and running on port ${PORT}`);
});

connectedServer.on('error', (error) => {
  console.error('Error: ', error);
})
