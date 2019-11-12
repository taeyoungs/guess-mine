import events from './events';
import chooseWord from './words';

let sockets = [];
let inProgress = false;
let painter = null;
let word = null;
let timeout = null;
let startingTimeout = null;
let clearingTimeout = null;

const socketController = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  const superBroadcast = (event, data) => io.emit(event, data);

  const playerUpdate = () => superBroadcast(events.playerUpdated, { sockets });

  const startGame = () => {
    if (sockets.length >= 2) {
      if (inProgress === false) {
        inProgress = true;
        painter = sockets[Math.floor(Math.random() * sockets.length)];
        word = chooseWord();
        superBroadcast(events.startGame);
        clearingTimeout = setTimeout(() => {
          superBroadcast(events.clearGameNotif);
        }, 3500);
        startingTimeout = setTimeout(() => {
          io.to(painter.id).emit(events.painterNotif, { word });
          superBroadcast(events.startTimeout);
          timeout = setTimeout(() => {
            superBroadcast(events.timeEnded);
            endGame();
          }, 30000);
        }, 4000);
      }
    }
  };

  const endGame = () => {
    inProgress = false;
    if (clearingTimeout !== null) {
      clearTimeout(clearingTimeout);
    }
    if (startingTimeout !== null) {
      clearTimeout(startingTimeout);
    }
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    setTimeout(() => startGame(), 2000);
  };

  const addPoints = id => {
    sockets = sockets.map(aSocket => {
      if (aSocket.id === id) {
        aSocket.points += 10;
      }
      return aSocket;
    });
    // 유저 목록 업데이트
    playerUpdate();
    // 게임 종료 + 메시지
    endGame();
    // 게임 다시 시작
  };

  socket.on(events.setNickname, ({ nickname }) => {
    socket.nickname = nickname;
    sockets.push({ id: socket.id, points: 0, nickname: socket.nickname });
    broadcast(events.newUser, { nickname });
    playerUpdate();
    startGame();
  });
  socket.on(events.disconnect, () => {
    console.log('Disconnected');
    sockets = sockets.filter(aSocket => aSocket.id !== socket.id);
    broadcast(events.disconnected, { nickname: socket.nickname });
    playerUpdate();
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
    if (message === word) {
      addPoints(socket.id);
      superBroadcast(events.correctAnswer, {
        message: `Winner is ${socket.nickname}, word was "${word}"`,
        nickname: 'Bot',
      });
    } else {
      broadcast(events.newMsg, { nickname: socket.nickname, message });
    }
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
