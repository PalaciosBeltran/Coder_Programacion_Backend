const express = require('express');
const path = require('path');
const apiRoutes = require('./routers/app.routers');
const {Products}  = require('./model');

const app = express();
const PORT = process.env.PORT || 8080;
const products = new Products();

app.set('views', './views');
app.set('view engine', 'ejs');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, './public')));

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
