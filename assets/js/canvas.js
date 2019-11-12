import { getSocket } from './sockets';

const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const clearBtn = document.getElementById('jsClear');
const controls = document.getElementById('jsControls');
const gameNotif = document.getElementById('jsGameNotif');
const msgForm = document.getElementById('jsSendMsg');
const clock = document.getElementById('jsTimeout');

const DEFAULT_COLOR = '#2c2c2c';
const CANVAS_SIZE = 500;

// 실제 픽셀 사이즈 부여
// CSS는 우리 눈에 보이는 캔버스의 사이즈를 설정한 것이다.
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = DEFAULT_COLOR;
ctx.fillStyle = DEFAULT_COLOR;
ctx.lineWidth = 2.5;

// 마우스를 클릭했을 때 painting이 시작되도록
// 그리고 마우스 드래그를 해제했을 때 멈추도록 + 캔버스를 벗어났을 때

let painting = false;
// fill, paint의 상태를 결정지어주는 변수를 하나 생성
let filling = false;

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

const beginPath = (x, y) => {
  ctx.beginPath();
  ctx.moveTo(x, y);
};

const storkePath = (x, y, color = null) => {
  const currentColor = ctx.strokeStyle;
  if (color !== null) {
    ctx.strokeStyle = color;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.strokeStyle = currentColor;
};

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    beginPath(x, y);
    getSocket().emit(window.events.beginPath, { x, y });
  } else {
    storkePath(x, y);
    getSocket().emit(window.events.strokePath, {
      x,
      y,
      color: ctx.strokeStyle,
    });
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = 'Fill';
  } else {
    filling = true;
    mode.innerText = 'Painting';
  }
}

const fillCanvas = (color = null) => {
  const currentColor = ctx.fillStyle;
  if (color !== null) {
    ctx.fillStyle = color;
  }
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.fillStyle = currentColor;
};

function handleCanvasClick() {
  if (filling) {
    fillCanvas();
    getSocket().emit(window.events.fill, { color: ctx.fillStyle });
  }
}

function handleCM(event) {
  event.preventDefault();
}

export const fillClear = () => {
  const currentColor = ctx.fillStyle;
  ctx.fillStyle = 'white';
  fillCanvas();
  ctx.fillStyle = currentColor;
};

function handleClearCanvas() {
  fillClear();
  getSocket().emit(window.events.fillClear);
}

export const enableCanvas = () => {
  canvas.addEventListener('click', handleCanvasClick);
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
};

export const disableCanvas = () => {
  canvas.removeEventListener('click', handleCanvasClick);
  canvas.removeEventListener('mousemove', onMouseMove);
  canvas.removeEventListener('mousedown', startPainting);
  canvas.removeEventListener('mouseup', stopPainting);
  canvas.removeEventListener('mouseleave', stopPainting);
};

export const removeControls = () => {
  controls.style.display = 'none';
};

export const showControls = () => {
  controls.style.display = 'flex';
};

export const disableChat = () => {
  msgForm.style.display = 'none';
};

export const enableChat = () => {
  msgForm.style.display = 'flex';
};

export const removeClock = () => {
  clock.style.display = 'none';
};

export const showClock = () => {
  clock.style.display = 'block';
};

export const removeNotif = () => {
  gameNotif.style.display = 'none';
};

export const showNotif = () => {
  gameNotif.style.display = 'block';
};

if (canvas) {
  enableCanvas();
  removeClock();
  gameNotif.innerText = 'The game starts when there are two or more players.';
  canvas.addEventListener('contextmenu', handleCM);
}

if (colors) {
  Array.from(colors).forEach(color =>
    color.addEventListener('click', handleColorClick),
  );
}

if (range) {
  range.addEventListener('input', handleRangeChange);
}

if (mode) {
  mode.addEventListener('click', handleModeClick);
}

if (clearBtn) {
  clearBtn.addEventListener('click', handleClearCanvas);
}

export const handleBeganPath = ({ x, y }) => beginPath(x, y);

export const handleStrokedPath = ({ x, y, color }) => storkePath(x, y, color);

export const handleFilled = ({ color }) => fillCanvas(color);

export const handleFillCleared = () => fillClear();
