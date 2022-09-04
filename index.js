const express = require(`express`);
const fs = require(`fs/promises`);

class Contenedor{
    constructor(fileName){
        this.fileName = fileName;
    }

    async save(newProduct){
        try {
            let fileContent = await this.getAll();
            fileContent.length !== 0 || undefined ? newProduct.id = fileContent[fileContent.length - 1].id + 1 : newProduct.id = 1; 
            fileContent.push(newProduct);
            fileContent = JSON.stringify(fileContent);
            await fs.writeFile(`./${this.fileName}`, fileContent);
            return newProduct.id
        }
        catch(error){
            console.log(error.message);
        }
    }

    async getById (id){
        try {
            let fileContent = await this.getAll();
            let productByID = null;
            fileContent.forEach(element => {
                if(element.id == id){
                    productByID = element;
                }
            });          
            return productByID;
        }
        catch(error){
            console.log(error.message);
        }        
    }

    async getAll(){
        try{
            let fileContent = JSON.parse(await fs.readFile(`./${this.fileName}`, `utf-8`));
            return fileContent;
        }
        catch(error){
            console.log(error.message);
        }
    }

    async readRandom(fileName){
        try{
            let fileContent = await this.getAll();
            let randomIndex = Math.round(Math.random()*(fileContent.length-1)+1);        
            let productByID;        
            fileContent.forEach(element => {
                if(element.id == randomIndex){
                    productByID = element;
                }
            });
            return productByID
        }
        catch(error){
            console.log(error.message);
        }
    }

    async deleteById(id){
        try{
            let fileContent = await this.getAll();
            fileContent = fileContent.filter((element) => element.id !== id);
            fileContent = JSON.stringify(fileContent);
            await fs.writeFile(`./${this.fileName}`, fileContent);
        }
        catch(error){
            console.log(error.message);
        }
    }

    async deleteAll(){
        try{
            let fileContent = JSON.stringify([]);
            await fs.writeFile(`./${this.fileName}`, fileContent);
        }
        catch(error){
            console.log(error.message);
        }
    }
}

const product = new Contenedor(`productos.json`);

const PORT = process.env.PORT || 8080;
const app = express();

const connectedServer = app.listen(PORT, () => {
    console.log(`Server is up and runnin on port ${PORT}`);
});

connectedServer.on(`error`, (error) => {
    console.log(error.message);
});


app.get(`/productos`, async (req, res) => {    
    const fileContent = await product.getAll();
    res.end(JSON.stringify(fileContent));
});

app.get(`/productoRandom`, async (req, res) => {
    const productByID = await product.readRandom();
    res.end(JSON.stringify(productByID));
});