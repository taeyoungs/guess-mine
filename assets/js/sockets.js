import {
  handleStartGame,
  handlePlayerUpdated,
  handleEndGame,
  handleNoPerson,
  handlePainterNotif,
  handleClearGameNotif,
  handleStartTimeout,
  handleTimeEnded,
} from './player';
import {
  handleFillCleared,
  handleFilled,
  handleStrokedPath,
  handleBeganPath,
} from './canvas';
import { handleNewUser, handleDisconnect } from './notifications';
import { handleNewMsg } from './chat';

let socket = null;

export const getSocket = () => socket;

export const initSockets = aSocket => {
  const { events } = window;
  console.log('initSocket!');
  socket = aSocket;
  socket.on(events.newUser, handleNewUser);
  socket.on(events.disconnected, handleDisconnect);
  socket.on(events.newMsg, handleNewMsg);
  socket.on(events.beganPath, handleBeganPath);
  socket.on(events.strokedPath, handleStrokedPath);
  socket.on(events.filled, handleFilled);
  socket.on(events.fillCleared, handleFillCleared);
  socket.on(events.playerUpdated, handlePlayerUpdated);
  socket.on(events.startGame, handleStartGame);
  socket.on(events.endGame, handleEndGame);
  socket.on(events.noPerson, handleNoPerson);
  socket.on(events.painterNotif, handlePainterNotif);
  socket.on(events.clearGameNotif, handleClearGameNotif);
  socket.on(events.correctAnswer, handleNewMsg);
  socket.on(events.startTimeout, handleStartTimeout);
  socket.on(events.timeEnded, handleTimeEnded);
};
