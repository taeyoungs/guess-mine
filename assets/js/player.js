const playerList = document.getElementById('jsPlayerList');

export const handlePlayerUpdated = ({ sockets }) => {
  playerList.innerHTML = '';
  console.log(sockets);
  sockets.map(socket => {
    const span = document.createElement('span');
    span.innerText = `${socket.nickname}: ${socket.points}`;
    playerList.appendChild(span);
  });
};
