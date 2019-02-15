const path = require('path');
const express = require('express');
const app  = express();
const Socketio = require('socket.io')


//setttings
app.set('port',process.env.PORT || 3000);

//static files
app.use(express.static(path.join(__dirname,'public')));
console.log(path.join(__dirname,'public'))


//start the server
const server = app.listen(app.get('port'),()=>{
    console.log("server on port", app.get('port'));
})

//web socket
const io = Socketio.listen(server);

io.on('connection',(socket)=>{
    console.log('new connection', socket.id);

    socket.on('chat:message', (datos) =>{
        io.sockets.emit('chat:message', datos);
    })

    socket.on('chat:typing', (datos) =>{
        socket.broadcast.emit('chat:typing', datos);
    })
});