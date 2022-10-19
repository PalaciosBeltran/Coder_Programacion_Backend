const socket = io();

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
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

messagesForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = emailInput.value;
    const message = messageInput.value;
    socket.emit('newUser', username); 
    socket.emit('newMessage', message);

});

socket.on('message', (data) => {
    const html = data.map((message) => {
        let newMessage = ` <p style="padding-top: 0.5rem"><b>
                        <strong><span style="color: blue">${message.username}</strong></span> 
                        <span style="color: brown">[${message.time}]:</span> 
                        <span style="color: green"><i>${message.text}</i></span></p>
                        `;        
        return newMessage;
      })
      .join("\n");
      msgHTML.innerHTML = html;    
});

socket.on('chatMessage', (data) =>{
    const user = data.username;
    const message = data.text;
    let renderMsgChat = ` <p style="padding-top: 0.3rem">
                        <strong><span style="color: blue">${user}</strong></span> 
                        <span style="color: brown">[${data.time}]:</span> 
                        <span style="color:green"><i>${message}</i></span></p>`;
    msgHTML.innerHTML =  msgHTML.innerHTML + renderMsgChat;  
});