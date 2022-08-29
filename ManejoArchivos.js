const fs = require('fs/promises');

class Contenedor{
    constructor(fileName){
        this.fileName = fileName;
    }

    save = async (newProduct) => {
        try {
            let fileContent = await fs.readFile(`./${this.fileName}`, `utf-8`);           
            let fileContentJSON = JSON.parse(fileContent);
            fileContentJSON.length !== 0 || undefined ? newProduct.id = fileContentJSON[fileContentJSON.length - 1].id + 1 : newProduct.id = 1; 
            fileContentJSON.push(newProduct);
            fileContent = JSON.stringify(fileContentJSON);
            await fs.writeFile(`./${this.fileName}`, fileContent);
            return newProduct.id
        }
        catch(error){
            console.log(error.message);
        }
    }

    getById = async (id) => {
        try {
            let fileContent = await fs.readFile(`./${this.fileName}`, `utf-8`);
            let fileContentJSON = JSON.parse(fileContent);
            let productByID = null;
            fileContentJSON.forEach(element => {
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

    getAll = async () => {
        try{
            let fileContent = await fs.readFile(`./${this.fileName}`, `utf-8`);
            let fileContentJSON = JSON.parse(fileContent);
            return fileContentJSON;
        }
        catch(error){
            console.log(error.message);
        }
    }

    deleteById = async (id) => {
        try{
            let fileContent = await fs.readFile(`./${this.fileName}`, `utf-8`);
            let fileContentJSON = JSON.parse(fileContent);
            fileContentJSON = fileContentJSON.filter((element) => element.id !== id);
            fileContent = JSON.stringify(fileContentJSON);
            await fs.writeFile(`./${this.fileName}`, fileContent);
        }
        catch(error){
            console.log(error.message);
        }
    }

    deleteAll = async () => {
        try{
            let fileContent = JSON.stringify([]);
            await fs.writeFile(`./${this.fileName}`, fileContent);
        }
        catch(error){
            console.log(error.message);
        }
    }
}


const HVACFile = new Contenedor(`productos.json`);
const newProduct = {"title": "Minisplit Inverter", "price": 300, "thumbnail": "https://cdn3.iconfinder.com/data/icons/hotel-and-services-1-1/512/17-512.png", "id": 1}

/* save(Object): Nuber - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado */
// HVACFile.save(newProduct).then(id => {
//     console.log(`El producto fue ingresado correctamente con el id ${id}`);
// })

/* getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está */
// const id = 2;
// HVACFile.getById(id).then(productByID => {
//     console.log(productByID);
// })

/* getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo. */
// HVACFile.getAll().then(allProducts => {
//         console.log(allProducts);
// })

/* deleteById(Number): void - Elimina del archivo el objeto con el id buscado. */
// const id = 2;
// HVACFile.deleteById(id).then(deletedProduct => {
//     console.log(`El producto con el id ${id} fue eliminado satisfactoriamente`);
// })

/* deleteAll(): void - Elimina todos los objetos presentes en el archivo. */
// HVACFile.deleteAll().then(result => {
//     console.log(`Todos los productos fueron eliminados satisfactoriamente`);
// })
