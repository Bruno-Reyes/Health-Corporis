$(function() {
    const socket = io()

    //Objetos
    const messageForm = $('#message-form')
    const messageBox = $('#message')
    const chat = $('#chat')
    const inputH = $('#inputH')
    const nickForm = $('#nickForm')
    const nickName = "Administrador"
    const usernames = $('#usernames')
    const UsuariosS = $('#Usuarios-S')


    //Eventos
    nickForm.submit(e => {
        e.preventDefault();
        socket.emit('new-user', nickName, data => {
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
        socket.emit('send-message-from-admin', { user: UsuariosS.val(), msg: messageBox.val() }, data => {
            chat.append(`<p class='error'>${data}</p>`)
        })
        messageBox.val('')
    })

    //Sockets
    socket.on('new-message-admin', function(data) {
        chat.append('<b>' + data.nick + '</b>: ' + data.msg + ' (' + data.privado + ')<br>')
    })
    socket.on('new-message-admin-from-user', function(data) {
        chat.append('<b>' + data.nick + '</b>: ' + data.msg + '<br>')
    })
    socket.on('usernames', data => {
        let html = ''
        let select = ''
        for (let i = 0; i < data.length; i++) {
            html += `<p><i class='fas fa-user'></i> ${data[i]}</p>`
            if (data[i] != 'Administrador') {
                select += `<option value="${data[i]}">${data[i]}</option>`
            }
        }
        usernames.html(html)
        UsuariosS.html(select)
    })
    socket.on('old-messages', data => {
        for (let i = 0; i < data.length; i++) {
            displayMsg(data[i])
        }
    })

    function displayMsg(data) {
        if (data.nick === 'Administrador') {
            chat.append(`<p class='older'><b>${data.nick}</b>: ${data.msg} (${data.privado})</p>`)
        } else {
            chat.append(`<p class='older'><b>${data.nick}</b>: ${data.msg}</p>`)
        }
    }
})