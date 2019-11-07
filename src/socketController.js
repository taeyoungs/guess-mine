import events from './events';
import chooseWord from './words';

let sockets = [];
let inProgress = false;
let leader = null;
let word = null;

const socketController = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  const superBroadcast = (event, data) => io.emit(event, data);
  const startGame = () => {
    if (inProgress === false) {
      inProgress = true;
      leader = sockets[Math.floor(Math.random() * sockets.length)];
      word = chooseWord();
    }
  };

  const endGame = () => {
    inProgress = false;
  };

  socket.on(events.setNickname, ({ nickname }) => {
    socket.nickname = nickname;
    sockets.push({ id: socket.id, points: 0, nickname: socket.nickname });
    broadcast(events.newUser, { nickname });
    superBroadcast(events.playerUpdated, { sockets });
    if (sockets.length >= 2) {
      startGame();
    }
  });
  socket.on(events.disconnect, () => {
    console.log('Disconnected');
    sockets = sockets.filter(aSocket => aSocket.id !== socket.id);
    broadcast(events.disconnected, { nickname: socket.nickname });
    superBroadcast(events.playerUpdated, { sockets });
    if (sockets.length === 1) {
      endGame();
    }
  });
  socket.on(events.sendMsg, ({ message }) => {
    console.log(message);
    broadcast(events.newMsg, { nickname: socket.nickname, message });
  });
  socket.on(events.beginPath, ({ x, y }) => {
    broadcast(events.beganPath, { x, y });
  });
  socket.on(events.strokePath, ({ x, y, color }) => {
    broadcast(events.strokedPath, { x, y, color });
  });
  socket.on(events.fill, ({ color }) => {
    broadcast(events.filled, { color });
  });
  socket.on(events.fillClear, () => {
    broadcast(events.fillCleared);
  });
};

export default socketController;
