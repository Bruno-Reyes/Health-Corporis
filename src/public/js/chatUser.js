$(function() {
    const socket = io()

    //Objetos
    const messageForm = $('#message-form')
    const messageBox = $('#message')
    const chat = $('#chat')
    const inputH = $('#inputH')
    const nickForm = $('#nickForm')
    var URLactual = window.location.href;
    var msg = URLactual.substr(32)

    //Eventos
    nickForm.submit(e => {
        e.preventDefault();
        socket.emit('new-user', msg, data => {
            console.log(msg)
            if (data) {
                $('#nickWrap').hide()
                $('#contentWrap').show()
            } else {
                $('#nickError').html(`<div class="alert alert-danger">Ese usuario ya existe</div>`)
            }
        })
    })
    messageForm.submit(e => {
        e.preventDefault();
        socket.emit('send-message-from-user', messageBox.val(), data => {
            chat.append(`<p class='error'>${data}</p>`)
        })
        messageBox.val('')
    })

    //Sockets
    socket.on('whisper', data => {
        chat.append(`<p class='whisper'><b>${data.nick}</b>: ${data.msg}</p>`)
    })
    socket.on('new-message-user-from-user', function(data) {
        if (msg === data.nick) {
            chat.append('<b>' + data.nick + '</b>: ' + data.msg + '<br>')
        }
    })
    socket.on('old-messages', data => {
        for (let i = 0; i < data.length; i++) {
            displayMsg(data[i])
        }
    })

    function displayMsg(data) {
        if (data.nick == 'Administrador' && data.privado == msg) {
            chat.append(`<p class='old-admin'><b>${data.nick}</b>: ${data.msg}</p>`)
        } else if (data.nick != 'Administrador' && data.privado == msg) {
            chat.append(`<p class='older'><b>${data.nick}</b>: ${data.msg}</p>`)
        }
    }
})