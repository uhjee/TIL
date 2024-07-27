import http from 'http';
import SocketIO from 'socket.io';
import express from 'express';

const app = express();

app.set('view engine', 'pug')
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => res.render('home'));
app.get('*', (req, res) => res.redirect('/'))


const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on('connection', socket => {
  socket.onAny((e) => {
    console.log(`socket event: ${e}`);
  })

  // 마지막 argument로 받는 callback func은 client에서 호출하도록 할 수 있음
  socket.on('enter_room', ({roomName}, cb) => {
    socket.join(roomName);
    cb();
    socket.to(roomName).emit('welcome');
  })
})

// const sockets = [];
// const wss = new WebSocket.Server({server}); // http server에  ws server 심기
//
// wss.on('connection', (socket) => {
//   console.log('Connected to Browser');
//   socket['nickname'] = 'Anon';
//   sockets.push(socket);
//
//   socket.on('message', (message) => {
//     const aMessage = JSON.parse(message)
//     switch (aMessage.type) {
//       case 'new_message':
//         sockets.forEach((aSocket) => {
//           console.log(aSocket.nickname)
//           aSocket.send(`${socket.nickname}: ${aMessage.payload.toString()}`);
//         });
//         break;
//       case 'nickname':
//         console.log(aMessage.payload);
//         socket['nickname'] = aMessage.payload;
//         break;
//
//     }
//   });
//   socket.on('close', () => console.log('Disconnected from the Browser❌'))
// });

const port = 3000;
const handleListen = () => console.log(`Listening on http://localhost:${port}`);
httpServer.listen(port, handleListen)

