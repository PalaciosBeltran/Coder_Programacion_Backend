const socket = io();

const usernameInput = document.getElementById('username');
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('input', (event) => {
    event.preventDefault();

    const username = usernameInput.value;

    socket.emit('username', username);
})

const productByID = document.getElementById("productos")
const productForm = document.getElementById("productsForm")
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
        .then((serverTemplate) =>{
            const template = Handlebars.compile(serverTemplate);
            const html = template({products});
            productByID.innerHTML = html;
        });  
});

const msgHTML = document.getElementById("messageHTML");
const messagesForm = document.getElementById('formMessages');
const emailInput = document.getElementById('id');
const nameInput = document.getElementById('nombre');
const lastnameInput = document.getElementById('apellido');
const ageInput = document.getElementById('edad');
const aliasInput = document.getElementById('alias');
const avatarInput = document.getElementById('avatar');
const messageInput = document.getElementById('mensaje');

messagesForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = emailInput.value;
    const name = nameInput.value;
    const lastname = lastnameInput.value;
    const age = ageInput.value;
    const alias = aliasInput.value;
    const avatar = avatarInput.value;
    const author = { 
        id: email,
        nombre: name,
        apellido: lastname,
        edad: age,
        alias: alias,
        avatar: avatar
    };
    const message = messageInput.value;
    socket.emit('newUser', author);
    socket.emit('newMessage', message);
});

socket.on('message', (data) => {
    const html = data.map((message) => {
        let newMessage = ` <p style="padding-top: 0.5rem"><b>
                        <strong><span style="color: blue">${message.author.alias}</strong></span> 
                        <span style="color: brown">[${message.time}]:</span> 
                        <span style="color: green"><i>${message.message}</i></span></p>
                        `;  
    return newMessage;
    })
    .join("\n");
    msgHTML.innerHTML = comp + html;    
});

socket.on('chatMessage', (data) =>{
    const user = data.author.alias;
    const message = data.message;
    let renderMsgChat = ` <p style="padding-top: 0.3rem">
                        <strong><span style="color: blue">${user}</strong></span> 
                        <span style="color: brown">[${data.time}]:</span> 
                        <span style="color:green"><i>${message}</i></span></p>`;
    msgHTML.innerHTML =  msgHTML.innerHTML + renderMsgChat;  
});