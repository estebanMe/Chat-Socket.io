'use strict'

var socket = io.connect('http://192.168.0.5:6677', { 'forceNew': true })

//Capturo los mensajes del servidor y lo mando a imprimir
socket.on('messages', function (data) {
    console.log(data)
    render(data) //Lo mando a imprimir
})

function render(data) { //mapeo el objeto que recibo por 'mensaje e indice'
    var html = data.map(function (message, index) {
        return (`
            <div class="message">
                <strong>${message.nickName}</strong> dice:
                <p>${message.text}</p>
            </div>
        `)
    }).join(' ') // join para meter un espacio entre elementos

    var div_msgs = document.getElementById('messages')
    div_msgs.innerHTML = html
    div_msgs.scrollTop = div_msgs.scrollHeight //Scroll siempre abajo
}

function addMessage(e) { // Recibo el nuck y el mensaje del cliente y lo emito por el canal
    var message = {
        nickName: document.getElementById('nickName').value,
        text: document.getElementById('text').value
    }
    document.getElementById('nickName').style.display = 'none' //oculto el nick para que solo sea modificado entrar.
    socket.emit('add-message', message) //Emito el mensaje por el canal
    return false
}