const socket = io(); // from server

const welcomeEl = document.querySelector('#welcome');
const formEl = welcomeEl.querySelector('form');
const roomEl = document.querySelector('#room');

roomEl.hidden = true;

let roomName = null;

const addMessage = (message) => {
  const ulEl = roomEl.querySelector('ul');
  console.log(ulEl)
  const liEl = document.createElement('li');
  liEl.innerText = message;
  ulEl.appendChild(liEl);
}

const showRoomEl = () => {
  welcomeEl.hidden = true;
  roomEl.hidden = false;
  const h3El = roomEl.querySelector('h3');
  h3El.innerText = `Room ${roomName}`;
}

const handleRoomSubmit = (e) => {
  e.preventDefault();
  const inputEl = formEl.querySelector('input');
  roomName = inputEl.value;
  socket.emit('enter_room', {roomName: inputEl.value}, showRoomEl);
  inputEl.value = '';
}

formEl.addEventListener('submit', handleRoomSubmit);

socket.on('welcome', () => {
  console.log('welcome?');
  addMessage('Someone joined.');
})
