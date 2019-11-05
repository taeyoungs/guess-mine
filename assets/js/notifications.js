const body = document.querySelector('body');

const fireNotification = (text, color) => {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = text;
  notification.style.backgroundColor = color;
  body.appendChild(notification);
};

// 새로운 유저가 로그인 했을 때 알림
export const handleNewUser = ({ nickname }) => {
  console.log(`${nickname} login !`);
  fireNotification(`${nickname} just joined!`, 'rgb(76, 217, 100)');
};

export const handleDisconnect = ({ nickname }) => {
  console.log(`${nickname} left !`);
  fireNotification(`${nickname} just lefted!`, 'rgb(255, 204, 0)');
};
