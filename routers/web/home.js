const { Router } = require('express');
const auth = require('../../auth/index');
const path = require('path');

const productosWebRouter = new Router()

productosWebRouter.get('/home', auth.webAuth, (req, res) => {
    res.render(path.join(process.cwd(), '/views/pages/home.ejs'), { nombre: req.session.username })
})

module.exports = productosWebRouter;