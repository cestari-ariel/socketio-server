const socket = io();

//DOM elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click',()=>{
    socket.emit('chat:message',{
        username: username.value,
        message: message.value
    });
});

socket.on('chat:message', datos => {
    actions.innerHTML='';
    output.innerHTML += `<p>
        <strong>${datos.username}</strong>: ${datos.message}
    </p>`;
})

message.addEventListener('keypress',()=>{
    socket.emit('chat:typing',username.value);
});

socket.on('chat:typing', datos => {
    actions.innerHTML = `<p>
   <em>${datos} esta escribiendo...</em>
</p>`;
})