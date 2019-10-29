import express from 'express';
import path from 'path';
import socketID from 'socket.io';

const PORT = 4000;
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => res.render('home'));

const handleListening = () => {
  console.log(`(～￣▽￣)～ Listening to http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
