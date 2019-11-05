import { handleNewUser, handleDisconnect } from './notifications';
import { handleNewMsg } from './chat';

let socket = null;

export const getSocket = () => socket;

export const updateSocket = aSocket => (socket = aSocket);

export const initSockets = aSocket => {
  const { events } = window;
  console.log('initSocket!');
  updateSocket(aSocket);
  socket.on(events.newUser, handleNewUser);
  socket.on(events.disconnected, handleDisconnect);
  socket.on(events.newMsg, handleNewMsg);
};
