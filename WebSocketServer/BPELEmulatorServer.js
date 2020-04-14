const express = require('express')
const SocketServer = require('ws').Server

const PORT = 3000

const server = express()
    .listen(PORT, () => console.log(`Listening on ${PORT}`))

const wss = new SocketServer({ server })

wss.on('connection', ws => {

    console.log('Client connected')
    
    // when server recive message from client
    ws.on('message', data => {
        if (data === 'testing') {
            ws.send(JSON.stringify({
                "test":'Testintg'
            }));
        }
        else {
            ws.send(JSON.stringify({
                "notification": "CONNECTIONREADY",
                "data": data
            }))
        }

    })

    // close conntection between server and client
    ws.on('close', () => {
        console.log('Close connected')
    })
})