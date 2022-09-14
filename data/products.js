const fs = require(`fs/promises`);

class Products{
    constructor(fileName){
        this.fileName = fileName;
    }

    async importInfo(){
      try{
        let products = JSON.parse(await fs.readFile(`./data/${this.fileName}`, `utf-8`));
        return products;
      }
      catch(error){
          console.log(error.message);
      }
    }

    async read(req, res){
        try{
            let products = await this.importInfo();
            const { maxPrice, search } = req.query;
            let productsResponse = products;
            if (Object.keys(req.query).length > 0) {
              if (maxPrice) {
                if (isNaN(+maxPrice)) {
                  return res.status(400).json({success: false, error: 'el valor maxPrice debe ser un valor válido'});
                }
                productsResponse = productsResponse.filter(product => product.price <= +maxPrice);
              }
              if (search) {
                productsResponse = productsResponse.filter(product => product.title.toLowerCase().startsWith(search.toLowerCase()))
              }
              return res.json({success: true, result: productsResponse });
            }
              return res.json({success: true, result: productsResponse });
        }
        catch(error){
            console.log(error.message);
        }
    }

    async getById (req, res){
        try {
            let products = await this.importInfo();
            const productId = req.params;
            const product = products.find(product => product.id === +productId.id);
            if (!product) {
              return res.status(404).json({ success: false, error: 'producto no encontrado'});
            }
            return res.json({ success: true, result: product });
        }
        catch(error){
            console.log(error.message);
        }        
    }

    async save(req, res){
        try {
            let products = await this.importInfo();
            const { title, price, thumbnail } = req.body;
            if ( !title || !price || !thumbnail ) {
              return res.status(400).json({ succes: false, error: 'Formato de cuerpo incorrecto' });
            }
            const newProduct = {      
              title,
              price,
              thumbnail,
              id: products.length + 1,
            };
            products.push(newProduct);
            await fs.writeFile(`./data/${this.fileName}`, JSON.stringify(products));
            return res.json({ success: true, result: newProduct });
        }
        catch(error){
            console.log(error.message);
        }
    }

  async change(req, res){
      try {
        let products = await this.importInfo();
        const productId = req.params;
        const {title, price, thumbnail} = req.body;
        if ( !title || !price || !thumbnail ) {
          return res.status(400).json({ success: false, error: 'Formato de cuerpo incorrecto' });
        };
        const productIndex = products.findIndex((product) => product.id === +productId.id);
        if (productIndex < 0) return res.status(404).json({ success: false, error: 'producto no encontrado'});
        const newProduct = {
          ...products[productIndex],
          title,
          price,
          thumbnail
        };
        products[productIndex] = newProduct;
        await fs.writeFile(`./data/${this.fileName}`, JSON.stringify(products));
        return res.json({ success: true, result: newProduct});
      }
      catch(error){
          console.log(error.message);
      }
  }

  async deleteById(req, res){
      try{
        let products = await this.importInfo();
        const productId = req.params;
        const productIndex = products.findIndex(product => product.id === +productId.id);
        if (productIndex < 0) return res.status(404).json({ success: false, error: 'producto no encontrado'});
        products.splice(productIndex, 1);
        await fs.writeFile(`./data/${this.fileName}`, JSON.stringify(products));
        return res.json({ success: true, result: 'producto eliminado correctamente' });
      }
      catch(error){
          console.log(error.message);
      }
  }
}

module.exports = Products;