import { getSocket } from './sockets';
import { removeClock, removeNotif } from './canvas';

const messages = document.getElementById('jsMessages');
const sendMsg = document.getElementById('jsSendMsg');

// 사용자 화면에 메세지 출력해주는 함수
export const appendMsg = (text, nickname) => {
  const li = document.createElement('li');
  if (nickname === 'Bot') {
    li.innerHTML = `<span class="author bot"> ${nickname}: </span>${text}`;
  } else {
    li.innerHTML = `<span class="author ${nickname ? 'out' : 'self'}"> ${
      nickname ? nickname : 'You'
    }: </span>${text}`;
  }
  messages.appendChild(li);
};

export const handleNewMsg = ({ message, nickname }) => {
  if (nickname === 'Bot') {
    removeNotif();
  }
  removeClock();
  appendMsg(message, nickname);
};

const handleSendMsg = event => {
  // 기존 submit 이벤트 막기
  event.preventDefault();

  // form 태그 안에 있는 input 태그 찾기
  const input = event.target.querySelector('input');
  const { value } = input;

  // Server Side로 메세지 전송 및 이벤트 발생
  const { events } = window;
  getSocket().emit(events.sendMsg, { message: value });
  appendMsg(value);
  input.value = '';
};

if (sendMsg) {
  sendMsg.addEventListener('submit', handleSendMsg);
}
