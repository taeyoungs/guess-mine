const socketController = socket => {
  //   console.log(socket);
  socket.on('setNickname', ({ nickname }) => {
    console.log(nickname);
    socket.nickname = nickname;
  });
};

export default socketController;
