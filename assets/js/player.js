import {
  fillClear,
  removeControls,
  disableCanvas,
  showControls,
  enableCanvas,
} from './canvas';

const playerList = document.getElementById('jsPlayerList');
const gameNotif = document.getElementById('jsGameNotif');

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
  gameNotif.innerText = 'The game will start soon.';
};

export const handleStartGame = () => {
  gameNotif.innerText = '';
  notifGameStart();
  fillClear();
  removeControls();
  disableCanvas();
};

export const handleEndGame = () => {
  fillClear();
  handleClearGameNotif();
};

export const handleNoPerson = () => {
  fillClear();
  gameNotif.innerText = 'The game starts when there are two or more players.';
};

export const handlePainterNotif = ({ word }) => {
  showControls();
  enableCanvas();
  gameNotif.innerText = '';
  gameNotif.innerText = `You are the leader, paint: ${word}`;
};
