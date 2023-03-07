const { WebSocketServer } = require('ws');

const Websocket = require('ws').Server;
const wss = new WebSocketServer({ port: 7777 });

wss.on('connection', function (ws) {
  ws.send('Hello?? i am a server.');
  ws.on('message', function (message) {
    console.log(`Client Said.... ${message}`);
    ws.send('I recept yout message....');
  });
});
