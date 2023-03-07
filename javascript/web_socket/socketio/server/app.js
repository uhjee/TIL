const path = require('path');
const { disconnect } = require('process');

const app = require('express')();
const server = require('http').createServer(app);

// http server 를 socket.io server로 wrapping;
const io = require('socket.io')(server);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 7777;
server.listen(PORT, () => {
  console.log(`Socket IO SERVER listening on port ${PORT}`);
});

// connection -> socket instance를 콜백 인자로 받음
io.on('connection', (socket) => {
  // login
  socket.on('login', (data) => {
    console.log(`Client logged-in: name: ${data.name}, userId: ${data.userId}`);

    // socket에 클라이언트 정보 저장
    socket.name = data.name;
    socket.userId = data.userId;

    // 모든 클라이언트에게 메세지 전송
    io.emit('login', data.name);
  });

  // chat
  socket.on('chat', (data) => {
    console.log(`Message From ${data.name}: ${data.msg}`);

    const msg = {
      from: {
        name: socket.name,
        userId: socket.userId,
      },
      msg: data.msg,
    };

    // 메세지를 전송한 클라이언트를 제외한 모든 클라이언트에 전송
    socket.broadcast.emit('chat', msg);
  });
  // force disconnect
  socket.on('forceDisconnect', () => {
    socket.disconnect();
  });

  // disconnect
  socket.on('disconnect', () => {
    console.log(`user disconnected ... ${socket.name}`);
  });
});
