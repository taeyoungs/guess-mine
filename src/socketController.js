import events from './events';

const socketController = socket => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);

  socket.on(events.setNickname, ({ nickname }) => {
    console.log(nickname);
    socket.nickname = nickname;
    broadcast(events.newUser, { nickname });
  });
  socket.on(events.disconnect, () => {
    console.log('Disconnected!');
    broadcast(events.disconnected, { nickname: socket.nickname });
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
