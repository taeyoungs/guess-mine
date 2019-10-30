const body = document.querySelector('body');
const loginForm = document.getElementById('jsLogin');

const LOGGED_IN = 'loggedIn';
const LOGGED_OUT = 'loggedOut';
const NICKNAME = 'nickname';

const nickname = localStorage.getItem(NICKNAME);

const logIn = nickname => {
  const socket = io('/');
  console.log(nickname);
  socket.emit('setNickname', { nickname });
};

if (nickname === null) {
  body.className = LOGGED_OUT;
} else {
  body.className = LOGGED_IN;
  logIn(nickname);
}

const handleFormSubmit = event => {
  event.preventDefault();
  const input = loginForm.querySelector('input');
  console.log(input.value);
  localStorage.setItem(NICKNAME, input.value);
  body.className = LOGGED_IN;
  logIn(input.value);
  input.value = '';
};

if (loginForm) {
  loginForm.addEventListener('submit', handleFormSubmit);
}
