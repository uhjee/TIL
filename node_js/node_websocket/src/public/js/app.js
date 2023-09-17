const messageList = document.querySelector('ul');
const messageFormEl = document.querySelector('#message');
const nicknameFormEl = document.querySelector('#nickname');


const socket = new WebSocket(`ws://${window.location.host}`)

socket.addEventListener('open', () => {
  console.log('Connected to the Server');
})

socket.addEventListener('message', (message) => {
  console.log('New message from the Server: ', message.data);
  const liEl = document.createElement('li');
  liEl.innerText = message.data;
  messageList.appendChild(liEl);
})

socket.addEventListener('close', () => {
  console.log('Disconnected from the Server❌');
});

const makeMessage = (type, payload) => {
  const msg = {type, payload};
  return JSON.stringify(msg);
}

const handleSubmit = (event) => {
  event.preventDefault();
  const inputEl = messageFormEl.querySelector('input');
  socket.send(makeMessage('new_message', inputEl.value));

  const liEl = document.createElement('li');
  liEl.innerText = `You: ${inputEl.value}`;
  messageList.appendChild(liEl);
  inputEl.value = '';
}

const handleNickSubmit = (event) => {
  event.preventDefault();
  const inputEl = nicknameFormEl.querySelector('input');
  socket.send(makeMessage('nickname', inputEl.value));
  inputEl.value = '';
}

messageFormEl.addEventListener('submit', handleSubmit)
nicknameFormEl.addEventListener('submit', handleNickSubmit);
