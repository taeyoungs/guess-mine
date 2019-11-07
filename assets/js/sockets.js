import { handleNewUser, handleDisconnect } from './notifications';
import { handleNewMsg } from './chat';
import {
  handleBeganPath,
  handleStrokedPath,
  handleFilled,
  handleFillCleared,
} from './canvas';
import { handlePlayerUpdated } from './player';

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
};
