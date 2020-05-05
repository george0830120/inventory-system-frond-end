const express = require('express')
const SocketServer = require('ws').Server
const startInteractionData = require("./fakeBPELData").startInteractionData
const unReadyStartInteractionData = require("./fakeBPELData").unReadyStartInteractionData
const pageInteractionData = require("./fakeBPELData").pageInteractionData
const notificationData = require("./fakeBPELData").notificationData

const PORT = 3000

const server = express()
    .listen(PORT, () => console.log(`Listening on ${PORT}`))

const wss = new SocketServer({ server })

wss.on('connection', ws => {

    console.log('Client connected')
    ws.send(JSON.stringify(notificationData))

    // when server recive message from client
    ws.on('message', data => {
        console.log("Receive Data: ");
        console.log(data);

        let receivedMessage = JSON.parse(data);
        // startInteractionPort : BPEL Engine receive wsdl and bpel file path
        if (receivedMessage.hasOwnProperty("bpelPath") && receivedMessage.hasOwnProperty("wsdlPath")) {
            ws.send(JSON.stringify(startInteractionData));
        }

        // startOperation From frontend
        if (receivedMessage.hasOwnProperty("pid") && receivedMessage.hasOwnProperty("portType")) {
            // operation under StartInteractionPort
            if (receivedMessage["portType"]["local_name"] == "startInteractionPort") {
                ws.send(JSON.stringify(unReadyStartInteractionData));
                ws.send(JSON.stringify(pafeInteractionData));
            }

            // operation under PageInteractionPort
            // find data and passing to OutputPortType
            if (receivedMessage["portType"]["local_name"] == "pageInteractionPort") {

            }
        }
    })

    // close conntection between server and client
    ws.on('close', () => {
        console.log('Close connected')
    })
})