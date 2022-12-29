const socket = io();

const productByID = document.getElementById("products");
const productForm = document.getElementById("productsForm");
const titleInput = document.getElementById("title");
const priceInput = document.getElementById("price");
const thumbnailInput = document.getElementById("thumbnail");

productForm.addEventListener("submit", (event) =>{
    event.preventDefault();

    const title = titleInput.value;
    const price = priceInput.value;
    const thumbnail = thumbnailInput.value;
    const newProduct = { title, price, thumbnail };   

    socket.emit("newProduct", newProduct);
    titleInput.value ="";
    priceInput.value ="";
    thumbnailInput.value ="";    
})

socket.on('products', (products) => { 
    fetch('main.hbs')
        .then((data) =>data.text())
        .then((serverTemplate) => {
            const template = Handlebars.compile(serverTemplate);
            const html = template({products});
            productByID.innerHTML = html;
        });  
});

// const schemaAuthor = new normalizr.schema.Entity('author', {}, { idAttribute: 'email' });
// const schemaMensaje = new normalizr.schema.Entity('post', { author: schemaAuthor }, { idAttribute: 'id' });
// const schemaMensajes = new normalizr.schema.Entity('posts', { mensajes: [schemaMensaje] }, { idAttribute: 'id' });
//const { normalize, schema } = require('normalizr');

const authorSchema = new schema.Entity('author', {}, { idAttribute: 'email' });
const messagesSchema = new schema.Entity('messages', {authors: authorSchema}, { idAttribute: '_id' });
const postsSchema = new schema.Entity('posts', {messages: [messagesSchema]}, { idAttribute: 'id' });
//const normalizedMessages = (messages) => normalize({ id: 'mensajes', mensajes: messages }, postsSchema);

const msgHTML = document.getElementById("messageHTML");

const usernameInput = document.getElementById('inputUsername');
const messageInput = document.getElementById('inputMensaje');
const btnEnviar = document.getElementById('btnEnviar')

const messagesForm = document.getElementById('messagesForm');
messagesForm.addEventListener("submit", (event) => {
    event.preventDefault();

    console.log('nuevo mensaje emitido!');

    const message = {
        author: { 
            emailId: usernameInput.value,
            name: document.getElementById('name').value,
            lastname: document.getElementById('lastname').value,
            age: document.getElementById('age').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value
        },
        message: messageInput.value
    }
    socket.emit('newMessage', message);
    // messagesForm.reset();
    // messageInput.focus();
});

socket.on('message', (mensajesN) => {

    const mensajesNsize = JSON.stringify(mensajesN).length;
    console.log(mensajesN, mensajesNsize);

    const mensajesD = normalizr.denormalize(mensajesN.result, postsSchema, mensajesN.entities);

    const mensajesDsize = JSON.stringify(mensajesD).length;
    console.log(mensajesD, mensajesDsize);

    const porcentajeC = parseInt((mensajesNsize * 100) / mensajesDsize);
    console.log(`Porcentaje de compresión ${porcentajeC}%`);
    document.getElementById('compresion-info').innerText = porcentajeC;

    //document.getElementById('compresion-info').innerText = 'test';

    const html = mensajesD.map((message) => {
        let newMessage = ` <p style="padding-top: 0.5rem"><b>
                        <img width="40" src="${message.author.avatar}" alt=" ">
                        <strong><span style="color: blue">${message.author.alias}</strong></span> 
                        <span style="color: brown">[${message.time}]:</span> 
                        <span style="color: green"><i>${message.message}</i></span></p>                        
                        `;  
    return newMessage;
    })
    .join("\n");
    msgHTML.innerHTML = html;    
});

usernameInput.addEventListener('input', () => {
    const hayEmail = usernameInput.value.length;
    const hayTexto = messageInput.value.length;
    messageInput.disabled = !hayEmail;
    btnEnviar.disabled = !hayEmail || !hayTexto;
})

messageInput.addEventListener('input', () => {
    const hayTexto = messageInput.value.length;
    btnEnviar.disabled = !hayTexto;
})