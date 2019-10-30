const body = document.querySelector('body');
const loginForm = document.getElementById('jsLogin');

const LOGGED_IN = 'loggedIn';
const LOGGED_OUT = 'loggedOut';
const NICKNAME = 'nickname';

const nickname = localStorage.getItem(NICKNAME);

if (nickname === null) {
  body.className = LOGGED_IN;
} else {
  body.className = LOGGED_OUT;
}

const handleFormSubmit = event => {
  event.preventDefault();
  const input = loginForm.querySelector('input');
  console.log(input.value);
  input.value = '';
  localStorage.setItem(NICKNAME, input.value);
};

if (loginForm) {
  loginForm.addEventListener('submit', handleFormSubmit);
}
