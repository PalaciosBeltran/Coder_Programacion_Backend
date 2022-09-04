const express = require(`express`);
const fs = require(`fs/promises`);

const read = async (fileName) => {
    try{
        let fileContent =  JSON.parse(await fs.readFile(`./${fileName}`, `utf-8`));           
        return fileContent;
    }
    catch(error){
        console.log(error.message);
    }
}

const readRandom = async (fileName) => {
    try{
        let fileContent = await read(fileName);
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

const PORT = process.env.PORT || 8080;
const app = express();

const connectedServer = app.listen(PORT, () => {
    console.log(`Server is up and runnin on port ${PORT}`);
});

connectedServer.on(`error`, (error) => {
    console.log(error.message);
});

app.get(`/productos`, async (req, res) => {
    const fileName = `productos.json`;
    const fileContent = await read(fileName);
    res.end(JSON.stringify(fileContent));
});

app.get(`/productoRandom`, async (req, res) => {
    const fileName = `productos.json`;
    const productByID = await readRandom(fileName);
    res.end(JSON.stringify(productByID));
});
