import express from 'express';
import path from 'path';
import socketIO from 'socket.io';
import logger from 'morgan';

const PORT = 4000;
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => res.render('home'));

const handleListening = () => {
  console.log(`(～￣▽￣)～ Listening to: http://localhost:${PORT}`);
};

const server = app.listen(PORT, handleListening);
const io = socketIO.listen(server);

let sockets = [];

io.on('connection', socket => {
  socket.emit('hello');
  socket.on('test to server', () => console.log('Server receive msg'));
});
