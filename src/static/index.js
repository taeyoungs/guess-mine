// eslint-disable-next-line no-undef
const socket = io('/');

socket.on('hello', () => console.log('Hello Test'));

socket.emit('test to server');
