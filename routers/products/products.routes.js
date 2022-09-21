const express = require(`express`);
const fs = require('fs');
const Products = require('../../model/products');

const router = express.Router();

// Middlewares
router.use(express.json());

let importedProducts = new Products();

// Routes
router.get('/', async (req, res) => {
    const read = await importedProducts.read(req, res);
    res.end();
});

router.get('/:id', async (req, res) => {
  const productByID = await importedProducts.getById(req, res);
  res.end();
});
  
router.post('/', async (req, res) => {
  const productByID = await importedProducts.save(req, res);
  res.end();
});
  
router.put('/:id', async (req, res) => {
  const productByID = await importedProducts.change(req, res);
  res.end();
});
  
router.delete('/:id', async (req, res) => {
  const productByID = await importedProducts.deleteById(req, res);
  res.end();
});

module.exports = router;