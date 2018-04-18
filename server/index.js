'use strict'
const express = require("express")
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const PORT = 6677 // mi puerto

app.use(express.static('client'))


var messages = [{
    id: 1,
    text: 'Bienvenido al chat privado...',
    nickName: 'El admin'
}]

//Conecto al socket y emito un mensajes a todos los clientes
io.on('connection', function (socket) {
    console.log(`El cliente con IP ${socket.handshake.address} se ha conectado...`)

    socket.emit('messages', messages)

    //Escucho y capturo los mensajes de un cliente para luego publicarlos a todos los clientes
    socket.on('add-message', function (data) {
        messages.push(data)
        io.sockets.emit('messages', messages)
    })
})

server.listen(PORT, function () {
    console.log(`El servidor esta funcionando en http://localhost:${PORT}`)
})