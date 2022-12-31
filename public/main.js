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

const authorSchema = new normalizr.schema.Entity('author', {}, { idAttribute: 'email' });
const messagesSchema = new normalizr.schema.Entity('messages', { author: authorSchema }, { idAttribute: 'id' });
const postsSchema = new normalizr.schema.Entity('posts', { messages: [messagesSchema] }, { idAttribute: 'id' });

const msgHTML = document.getElementById("messageHTML");

const usernameInput = document.getElementById('inputUsername');
const messageInput = document.getElementById('inputMensaje');
const btnEnviar = document.getElementById('btnEnviar')

const messagesForm = document.getElementById('messagesForm');
messagesForm.addEventListener("submit", (event) => {
    event.preventDefault();

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
    usernameInput.value = "";
    document.getElementById('name').value = "";
    document.getElementById('lastname').value = "";
    document.getElementById('age').value = "";
    document.getElementById('alias').value = "";
    document.getElementById('avatar').value;
});

socket.on('message', mensajesN => {

    const mensajesNsize = JSON.stringify(mensajesN).length;
    console.log(mensajesN, mensajesNsize);

    const mensajesD = normalizr.denormalize(mensajesN.result, postsSchema, mensajesN.entities);
    const mensajesDsize = JSON.stringify(mensajesD).length;
    console.log(mensajesD, mensajesDsize);

    const porcentajeC = parseInt((mensajesNsize * 100) / mensajesDsize);
    document.getElementById('compresion-info').innerText = porcentajeC;

    const html = mensajesD.mensajes.map((message) => {
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