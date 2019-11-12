import events from './events';
import chooseWord from './words';

let sockets = [];
let inProgress = false;
let painter = null;
let word = null;

const socketController = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  const superBroadcast = (event, data) => io.emit(event, data);
  const startGame = () => {
    if (inProgress === false) {
      inProgress = true;
      painter = sockets[Math.floor(Math.random() * sockets.length)];
      word = chooseWord();
      superBroadcast(events.startGame);
      setTimeout(() => {
        superBroadcast(events.clearGameNotif);
      }, 4500);
      setTimeout(() => {
        io.to(painter.id).emit(events.painterNotif, { word });
      }, 5000);
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
      broadcast(events.noPerson);
    } else if (painter) {
      if (painter.id === socket.id) {
        endGame();
        broadcast(events.endGame);
      }
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
