import {
  fillClear,
  removeControls,
  disableCanvas,
  showControls,
  enableCanvas,
  disableChat,
  enableChat,
  removeClock,
  showClock,
  removeNotif,
  showNotif,
} from './canvas';

const playerList = document.getElementById('jsPlayerList');
const gameNotif = document.getElementById('jsGameNotif');
const clock = document.getElementById('jsTimeout');

let time = null;
let timeout = null;

export const handlePlayerUpdated = ({ sockets }) => {
  playerList.innerHTML = '';
  console.log(sockets);
  sockets.map(socket => {
    const span = document.createElement('span');
    span.innerText = `${socket.nickname}: ${socket.points}`;
    playerList.appendChild(span);
  });
};

export const handleClearGameNotif = () => {
  gameNotif.innerText = '';
};

const notifGameStart = () => {
  showNotif();
  gameNotif.innerText = 'The game will start soon.';
};

export const handleStartGame = () => {
  clearInterval(timeout);
  clock.innerHTML = '';
  enableChat();
  notifGameStart();
  fillClear();
  removeControls();
  disableCanvas();
};

export const handleEndGame = () => {
  clearInterval(timeout);
  showNotif();
  removeClock();
  fillClear();
  handleClearGameNotif();
};

export const handleNoPerson = () => {
  clearInterval(timeout);
  removeClock();
  enableChat();
  fillClear();
  showNotif();
  enableCanvas();
  gameNotif.innerText = 'The game starts when there are two or more players.';
};

export const handlePainterNotif = ({ word }) => {
  // painter 채팅 금지
  disableChat();
  showControls();
  enableCanvas();
  showNotif();
  gameNotif.innerText = '';
  gameNotif.innerText = `You are the painter, paint: ${word}`;
};

export const handleStartTimeout = () => {
  showClock();
  clearInterval(timeout);
  time = 30;

  const span = document.createElement('span');
  span.innerHTML = `${time}s`;
  clock.innerHTML = '';
  clock.appendChild(span);

  timeout = setInterval(() => {
    time -= 1;
    span.innerHTML = `${time}s`;
    clock.innerHTML = '';
    clock.appendChild(span);
  }, 1000);
};

export const handleTimeEnded = () => {
  showNotif();
  removeClock();
  clearInterval(timeout);
  gameNotif.innerText = '';
  gameNotif.innerHTML = 'Time Ended, No Winner';
};
