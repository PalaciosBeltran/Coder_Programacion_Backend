const { Router } = require('express');
const auth = require('../../auth/index');
const path = require('path');
const Products = require('../../models/daos/products/products.mongo.dao');
const products = new Products();
const newProduct = require('../websocket/products.ws').nProduct;

const productosWebRouter = new Router();

productosWebRouter.get('/', auth.webAuth, async (req, res) => { /*/home*/
    const productsList = await products.importInfo();
    res.render(path.join(process.cwd(), '/views/pages/home.hbs'), { welcomeName: req.session.username, products: productsList})
});

productosWebRouter.post('/', auth.webAuth, async (req, res) => { /*/home*/
    // const title = document.getElementById("title").value;
    // const price = document.getElementById("price").value;
    // const thumbnail = document.getElementById("thumbnail").value;
    // const newProduct = { title, price, thumbnail };
    await products.save(newProduct);
    const productsList = await products.importInfo();
    res.render(path.join(process.cwd(), '/views/pages/home.hbs'), { welcomeName: req.session.username, products: productsList });
});

module.exports = productosWebRouter;