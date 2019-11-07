(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleFillCleared = exports.handleFilled = exports.handleStrokedPath = exports.handleBeganPath = void 0;

var _sockets = require("./sockets");

var canvas = document.getElementById('jsCanvas');
var ctx = canvas.getContext('2d');
var colors = document.getElementsByClassName('jsColor');
var range = document.getElementById('jsRange');
var mode = document.getElementById('jsMode');
var clearBtn = document.getElementById('jsClear');
var DEFAULT_COLOR = '#2c2c2c';
var CANVAS_SIZE = 500; // 실제 픽셀 사이즈 부여
// CSS는 우리 눈에 보이는 캔버스의 사이즈를 설정한 것이다.

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = DEFAULT_COLOR;
ctx.fillStyle = DEFAULT_COLOR;
ctx.lineWidth = 2.5; // 마우스를 클릭했을 때 painting이 시작되도록
// 그리고 마우스 드래그를 해제했을 때 멈추도록 + 캔버스를 벗어났을 때

var painting = false; // fill, paint의 상태를 결정지어주는 변수를 하나 생성

var filling = false;

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

var beginPath = function beginPath(x, y) {
  ctx.beginPath();
  ctx.moveTo(x, y);
};

var storkePath = function storkePath(x, y) {
  var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var currentColor = ctx.strokeStyle;

  if (color !== null) {
    ctx.strokeStyle = color;
  }

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.strokeStyle = currentColor;
};

function onMouseMove(event) {
  var x = event.offsetX;
  var y = event.offsetY;

  if (!painting) {
    beginPath(x, y);
    (0, _sockets.getSocket)().emit(window.events.beginPath, {
      x: x,
      y: y
    });
  } else {
    storkePath(x, y);
    (0, _sockets.getSocket)().emit(window.events.strokePath, {
      x: x,
      y: y,
      color: ctx.strokeStyle
    });
  }
}

function handleColorClick(event) {
  var color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  var size = event.target.value;
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

var fillCanvas = function fillCanvas() {
  var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var currentColor = ctx.fillStyle;

  if (color !== null) {
    ctx.fillStyle = color;
  }

  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.fillStyle = currentColor;
};

function handleCanvasClick() {
  if (filling) {
    fillCanvas();
    (0, _sockets.getSocket)().emit(window.events.fill, {
      color: ctx.fillStyle
    });
  }
}

function handleCM(event) {
  event.preventDefault();
}

var fillClear = function fillClear() {
  var currentColor = ctx.fillStyle;
  ctx.fillStyle = 'white';
  fillCanvas();
  ctx.fillStyle = currentColor;
};

function handleClearCanvas() {
  fillClear();
  (0, _sockets.getSocket)().emit(window.events.fillClear);
}

if (canvas) {
  canvas.addEventListener('click', handleCanvasClick);
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('contextmenu', handleCM);
}

if (colors) {
  Array.from(colors).forEach(function (color) {
    return color.addEventListener('click', handleColorClick);
  });
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

var handleBeganPath = function handleBeganPath(_ref) {
  var x = _ref.x,
      y = _ref.y;
  return beginPath(x, y);
};

exports.handleBeganPath = handleBeganPath;

var handleStrokedPath = function handleStrokedPath(_ref2) {
  var x = _ref2.x,
      y = _ref2.y,
      color = _ref2.color;
  return storkePath(x, y, color);
};

exports.handleStrokedPath = handleStrokedPath;

var handleFilled = function handleFilled(_ref3) {
  var color = _ref3.color;
  return fillCanvas(color);
};

exports.handleFilled = handleFilled;

var handleFillCleared = function handleFillCleared() {
  return fillClear();
};

exports.handleFillCleared = handleFillCleared;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbnZhcy5qcyJdLCJuYW1lcyI6WyJjYW52YXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY3R4IiwiZ2V0Q29udGV4dCIsImNvbG9ycyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJyYW5nZSIsIm1vZGUiLCJjbGVhckJ0biIsIkRFRkFVTFRfQ09MT1IiLCJDQU5WQVNfU0laRSIsIndpZHRoIiwiaGVpZ2h0IiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJzdHJva2VTdHlsZSIsImxpbmVXaWR0aCIsInBhaW50aW5nIiwiZmlsbGluZyIsInN0YXJ0UGFpbnRpbmciLCJzdG9wUGFpbnRpbmciLCJiZWdpblBhdGgiLCJ4IiwieSIsIm1vdmVUbyIsInN0b3JrZVBhdGgiLCJjb2xvciIsImN1cnJlbnRDb2xvciIsImxpbmVUbyIsInN0cm9rZSIsIm9uTW91c2VNb3ZlIiwiZXZlbnQiLCJvZmZzZXRYIiwib2Zmc2V0WSIsImVtaXQiLCJ3aW5kb3ciLCJldmVudHMiLCJzdHJva2VQYXRoIiwiaGFuZGxlQ29sb3JDbGljayIsInRhcmdldCIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwiaGFuZGxlUmFuZ2VDaGFuZ2UiLCJzaXplIiwidmFsdWUiLCJoYW5kbGVNb2RlQ2xpY2siLCJpbm5lclRleHQiLCJmaWxsQ2FudmFzIiwiaGFuZGxlQ2FudmFzQ2xpY2siLCJmaWxsIiwiaGFuZGxlQ00iLCJwcmV2ZW50RGVmYXVsdCIsImZpbGxDbGVhciIsImhhbmRsZUNsZWFyQ2FudmFzIiwiYWRkRXZlbnRMaXN0ZW5lciIsIkFycmF5IiwiZnJvbSIsImZvckVhY2giLCJoYW5kbGVCZWdhblBhdGgiLCJoYW5kbGVTdHJva2VkUGF0aCIsImhhbmRsZUZpbGxlZCIsImhhbmRsZUZpbGxDbGVhcmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUEsSUFBTUEsTUFBTSxHQUFHQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsVUFBeEIsQ0FBZjtBQUNBLElBQU1DLEdBQUcsR0FBR0gsTUFBTSxDQUFDSSxVQUFQLENBQWtCLElBQWxCLENBQVo7QUFDQSxJQUFNQyxNQUFNLEdBQUdKLFFBQVEsQ0FBQ0ssc0JBQVQsQ0FBZ0MsU0FBaEMsQ0FBZjtBQUNBLElBQU1DLEtBQUssR0FBR04sUUFBUSxDQUFDQyxjQUFULENBQXdCLFNBQXhCLENBQWQ7QUFDQSxJQUFNTSxJQUFJLEdBQUdQLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixRQUF4QixDQUFiO0FBQ0EsSUFBTU8sUUFBUSxHQUFHUixRQUFRLENBQUNDLGNBQVQsQ0FBd0IsU0FBeEIsQ0FBakI7QUFFQSxJQUFNUSxhQUFhLEdBQUcsU0FBdEI7QUFDQSxJQUFNQyxXQUFXLEdBQUcsR0FBcEIsQyxDQUVBO0FBQ0E7O0FBQ0FYLE1BQU0sQ0FBQ1ksS0FBUCxHQUFlRCxXQUFmO0FBQ0FYLE1BQU0sQ0FBQ2EsTUFBUCxHQUFnQkYsV0FBaEI7QUFFQVIsR0FBRyxDQUFDVyxTQUFKLEdBQWdCLE9BQWhCO0FBQ0FYLEdBQUcsQ0FBQ1ksUUFBSixDQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUJKLFdBQW5CLEVBQWdDQSxXQUFoQztBQUNBUixHQUFHLENBQUNhLFdBQUosR0FBa0JOLGFBQWxCO0FBQ0FQLEdBQUcsQ0FBQ1csU0FBSixHQUFnQkosYUFBaEI7QUFDQVAsR0FBRyxDQUFDYyxTQUFKLEdBQWdCLEdBQWhCLEMsQ0FFQTtBQUNBOztBQUVBLElBQUlDLFFBQVEsR0FBRyxLQUFmLEMsQ0FDQTs7QUFDQSxJQUFJQyxPQUFPLEdBQUcsS0FBZDs7QUFFQSxTQUFTQyxhQUFULEdBQXlCO0FBQ3ZCRixFQUFBQSxRQUFRLEdBQUcsSUFBWDtBQUNEOztBQUVELFNBQVNHLFlBQVQsR0FBd0I7QUFDdEJILEVBQUFBLFFBQVEsR0FBRyxLQUFYO0FBQ0Q7O0FBRUQsSUFBTUksU0FBUyxHQUFHLFNBQVpBLFNBQVksQ0FBQ0MsQ0FBRCxFQUFJQyxDQUFKLEVBQVU7QUFDMUJyQixFQUFBQSxHQUFHLENBQUNtQixTQUFKO0FBQ0FuQixFQUFBQSxHQUFHLENBQUNzQixNQUFKLENBQVdGLENBQVgsRUFBY0MsQ0FBZDtBQUNELENBSEQ7O0FBS0EsSUFBTUUsVUFBVSxHQUFHLFNBQWJBLFVBQWEsQ0FBQ0gsQ0FBRCxFQUFJQyxDQUFKLEVBQXdCO0FBQUEsTUFBakJHLEtBQWlCLHVFQUFULElBQVM7QUFDekMsTUFBTUMsWUFBWSxHQUFHekIsR0FBRyxDQUFDYSxXQUF6Qjs7QUFDQSxNQUFJVyxLQUFLLEtBQUssSUFBZCxFQUFvQjtBQUNsQnhCLElBQUFBLEdBQUcsQ0FBQ2EsV0FBSixHQUFrQlcsS0FBbEI7QUFDRDs7QUFDRHhCLEVBQUFBLEdBQUcsQ0FBQzBCLE1BQUosQ0FBV04sQ0FBWCxFQUFjQyxDQUFkO0FBQ0FyQixFQUFBQSxHQUFHLENBQUMyQixNQUFKO0FBQ0EzQixFQUFBQSxHQUFHLENBQUNhLFdBQUosR0FBa0JZLFlBQWxCO0FBQ0QsQ0FSRDs7QUFVQSxTQUFTRyxXQUFULENBQXFCQyxLQUFyQixFQUE0QjtBQUMxQixNQUFNVCxDQUFDLEdBQUdTLEtBQUssQ0FBQ0MsT0FBaEI7QUFDQSxNQUFNVCxDQUFDLEdBQUdRLEtBQUssQ0FBQ0UsT0FBaEI7O0FBQ0EsTUFBSSxDQUFDaEIsUUFBTCxFQUFlO0FBQ2JJLElBQUFBLFNBQVMsQ0FBQ0MsQ0FBRCxFQUFJQyxDQUFKLENBQVQ7QUFDQSw4QkFBWVcsSUFBWixDQUFpQkMsTUFBTSxDQUFDQyxNQUFQLENBQWNmLFNBQS9CLEVBQTBDO0FBQUVDLE1BQUFBLENBQUMsRUFBREEsQ0FBRjtBQUFLQyxNQUFBQSxDQUFDLEVBQURBO0FBQUwsS0FBMUM7QUFDRCxHQUhELE1BR087QUFDTEUsSUFBQUEsVUFBVSxDQUFDSCxDQUFELEVBQUlDLENBQUosQ0FBVjtBQUNBLDhCQUFZVyxJQUFaLENBQWlCQyxNQUFNLENBQUNDLE1BQVAsQ0FBY0MsVUFBL0IsRUFBMkM7QUFDekNmLE1BQUFBLENBQUMsRUFBREEsQ0FEeUM7QUFFekNDLE1BQUFBLENBQUMsRUFBREEsQ0FGeUM7QUFHekNHLE1BQUFBLEtBQUssRUFBRXhCLEdBQUcsQ0FBQ2E7QUFIOEIsS0FBM0M7QUFLRDtBQUNGOztBQUVELFNBQVN1QixnQkFBVCxDQUEwQlAsS0FBMUIsRUFBaUM7QUFDL0IsTUFBTUwsS0FBSyxHQUFHSyxLQUFLLENBQUNRLE1BQU4sQ0FBYUMsS0FBYixDQUFtQkMsZUFBakM7QUFDQXZDLEVBQUFBLEdBQUcsQ0FBQ2EsV0FBSixHQUFrQlcsS0FBbEI7QUFDQXhCLEVBQUFBLEdBQUcsQ0FBQ1csU0FBSixHQUFnQmEsS0FBaEI7QUFDRDs7QUFFRCxTQUFTZ0IsaUJBQVQsQ0FBMkJYLEtBQTNCLEVBQWtDO0FBQ2hDLE1BQU1ZLElBQUksR0FBR1osS0FBSyxDQUFDUSxNQUFOLENBQWFLLEtBQTFCO0FBQ0ExQyxFQUFBQSxHQUFHLENBQUNjLFNBQUosR0FBZ0IyQixJQUFoQjtBQUNEOztBQUVELFNBQVNFLGVBQVQsR0FBMkI7QUFDekIsTUFBSTNCLE9BQU8sS0FBSyxJQUFoQixFQUFzQjtBQUNwQkEsSUFBQUEsT0FBTyxHQUFHLEtBQVY7QUFDQVgsSUFBQUEsSUFBSSxDQUFDdUMsU0FBTCxHQUFpQixNQUFqQjtBQUNELEdBSEQsTUFHTztBQUNMNUIsSUFBQUEsT0FBTyxHQUFHLElBQVY7QUFDQVgsSUFBQUEsSUFBSSxDQUFDdUMsU0FBTCxHQUFpQixVQUFqQjtBQUNEO0FBQ0Y7O0FBRUQsSUFBTUMsVUFBVSxHQUFHLFNBQWJBLFVBQWEsR0FBa0I7QUFBQSxNQUFqQnJCLEtBQWlCLHVFQUFULElBQVM7QUFDbkMsTUFBTUMsWUFBWSxHQUFHekIsR0FBRyxDQUFDVyxTQUF6Qjs7QUFDQSxNQUFJYSxLQUFLLEtBQUssSUFBZCxFQUFvQjtBQUNsQnhCLElBQUFBLEdBQUcsQ0FBQ1csU0FBSixHQUFnQmEsS0FBaEI7QUFDRDs7QUFDRHhCLEVBQUFBLEdBQUcsQ0FBQ1ksUUFBSixDQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUJKLFdBQW5CLEVBQWdDQSxXQUFoQztBQUNBUixFQUFBQSxHQUFHLENBQUNXLFNBQUosR0FBZ0JjLFlBQWhCO0FBQ0QsQ0FQRDs7QUFTQSxTQUFTcUIsaUJBQVQsR0FBNkI7QUFDM0IsTUFBSTlCLE9BQUosRUFBYTtBQUNYNkIsSUFBQUEsVUFBVTtBQUNWLDhCQUFZYixJQUFaLENBQWlCQyxNQUFNLENBQUNDLE1BQVAsQ0FBY2EsSUFBL0IsRUFBcUM7QUFBRXZCLE1BQUFBLEtBQUssRUFBRXhCLEdBQUcsQ0FBQ1c7QUFBYixLQUFyQztBQUNEO0FBQ0Y7O0FBRUQsU0FBU3FDLFFBQVQsQ0FBa0JuQixLQUFsQixFQUF5QjtBQUN2QkEsRUFBQUEsS0FBSyxDQUFDb0IsY0FBTjtBQUNEOztBQUVELElBQU1DLFNBQVMsR0FBRyxTQUFaQSxTQUFZLEdBQU07QUFDdEIsTUFBTXpCLFlBQVksR0FBR3pCLEdBQUcsQ0FBQ1csU0FBekI7QUFDQVgsRUFBQUEsR0FBRyxDQUFDVyxTQUFKLEdBQWdCLE9BQWhCO0FBQ0FrQyxFQUFBQSxVQUFVO0FBQ1Y3QyxFQUFBQSxHQUFHLENBQUNXLFNBQUosR0FBZ0JjLFlBQWhCO0FBQ0QsQ0FMRDs7QUFPQSxTQUFTMEIsaUJBQVQsR0FBNkI7QUFDM0JELEVBQUFBLFNBQVM7QUFDVCw0QkFBWWxCLElBQVosQ0FBaUJDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjZ0IsU0FBL0I7QUFDRDs7QUFFRCxJQUFJckQsTUFBSixFQUFZO0FBQ1ZBLEVBQUFBLE1BQU0sQ0FBQ3VELGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDTixpQkFBakM7QUFDQWpELEVBQUFBLE1BQU0sQ0FBQ3VELGdCQUFQLENBQXdCLFdBQXhCLEVBQXFDeEIsV0FBckM7QUFDQS9CLEVBQUFBLE1BQU0sQ0FBQ3VELGdCQUFQLENBQXdCLFdBQXhCLEVBQXFDbkMsYUFBckM7QUFDQXBCLEVBQUFBLE1BQU0sQ0FBQ3VELGdCQUFQLENBQXdCLFNBQXhCLEVBQW1DbEMsWUFBbkM7QUFDQXJCLEVBQUFBLE1BQU0sQ0FBQ3VELGdCQUFQLENBQXdCLFlBQXhCLEVBQXNDbEMsWUFBdEM7QUFDQXJCLEVBQUFBLE1BQU0sQ0FBQ3VELGdCQUFQLENBQXdCLGFBQXhCLEVBQXVDSixRQUF2QztBQUNEOztBQUVELElBQUk5QyxNQUFKLEVBQVk7QUFDVm1ELEVBQUFBLEtBQUssQ0FBQ0MsSUFBTixDQUFXcEQsTUFBWCxFQUFtQnFELE9BQW5CLENBQTJCLFVBQUEvQixLQUFLO0FBQUEsV0FDOUJBLEtBQUssQ0FBQzRCLGdCQUFOLENBQXVCLE9BQXZCLEVBQWdDaEIsZ0JBQWhDLENBRDhCO0FBQUEsR0FBaEM7QUFHRDs7QUFFRCxJQUFJaEMsS0FBSixFQUFXO0FBQ1RBLEVBQUFBLEtBQUssQ0FBQ2dELGdCQUFOLENBQXVCLE9BQXZCLEVBQWdDWixpQkFBaEM7QUFDRDs7QUFFRCxJQUFJbkMsSUFBSixFQUFVO0FBQ1JBLEVBQUFBLElBQUksQ0FBQytDLGdCQUFMLENBQXNCLE9BQXRCLEVBQStCVCxlQUEvQjtBQUNEOztBQUVELElBQUlyQyxRQUFKLEVBQWM7QUFDWkEsRUFBQUEsUUFBUSxDQUFDOEMsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUNELGlCQUFuQztBQUNEOztBQUVNLElBQU1LLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0I7QUFBQSxNQUFHcEMsQ0FBSCxRQUFHQSxDQUFIO0FBQUEsTUFBTUMsQ0FBTixRQUFNQSxDQUFOO0FBQUEsU0FBY0YsU0FBUyxDQUFDQyxDQUFELEVBQUlDLENBQUosQ0FBdkI7QUFBQSxDQUF4Qjs7OztBQUVBLElBQU1vQyxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CO0FBQUEsTUFBR3JDLENBQUgsU0FBR0EsQ0FBSDtBQUFBLE1BQU1DLENBQU4sU0FBTUEsQ0FBTjtBQUFBLE1BQVNHLEtBQVQsU0FBU0EsS0FBVDtBQUFBLFNBQXFCRCxVQUFVLENBQUNILENBQUQsRUFBSUMsQ0FBSixFQUFPRyxLQUFQLENBQS9CO0FBQUEsQ0FBMUI7Ozs7QUFFQSxJQUFNa0MsWUFBWSxHQUFHLFNBQWZBLFlBQWU7QUFBQSxNQUFHbEMsS0FBSCxTQUFHQSxLQUFIO0FBQUEsU0FBZXFCLFVBQVUsQ0FBQ3JCLEtBQUQsQ0FBekI7QUFBQSxDQUFyQjs7OztBQUVBLElBQU1tQyxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CO0FBQUEsU0FBTVQsU0FBUyxFQUFmO0FBQUEsQ0FBMUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRTb2NrZXQgfSBmcm9tICcuL3NvY2tldHMnO1xyXG5cclxuY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzQ2FudmFzJyk7XHJcbmNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5jb25zdCBjb2xvcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdqc0NvbG9yJyk7XHJcbmNvbnN0IHJhbmdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzUmFuZ2UnKTtcclxuY29uc3QgbW9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqc01vZGUnKTtcclxuY29uc3QgY2xlYXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanNDbGVhcicpO1xyXG5cclxuY29uc3QgREVGQVVMVF9DT0xPUiA9ICcjMmMyYzJjJztcclxuY29uc3QgQ0FOVkFTX1NJWkUgPSA1MDA7XHJcblxyXG4vLyDsi6TsoJwg7ZS97IWAIOyCrOydtOymiCDrtoDsl6xcclxuLy8gQ1NT64qUIOyasOumrCDriIjsl5Ag67O07J2064qUIOy6lOuyhOyKpOydmCDsgqzsnbTspojrpbwg7ISk7KCV7ZWcIOqyg+ydtOuLpC5cclxuY2FudmFzLndpZHRoID0gQ0FOVkFTX1NJWkU7XHJcbmNhbnZhcy5oZWlnaHQgPSBDQU5WQVNfU0laRTtcclxuXHJcbmN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xyXG5jdHguZmlsbFJlY3QoMCwgMCwgQ0FOVkFTX1NJWkUsIENBTlZBU19TSVpFKTtcclxuY3R4LnN0cm9rZVN0eWxlID0gREVGQVVMVF9DT0xPUjtcclxuY3R4LmZpbGxTdHlsZSA9IERFRkFVTFRfQ09MT1I7XHJcbmN0eC5saW5lV2lkdGggPSAyLjU7XHJcblxyXG4vLyDrp4jsmrDsiqTrpbwg7YG066at7ZaI7J2EIOuVjCBwYWludGluZ+ydtCDsi5zsnpHrkJjrj4TroZ1cclxuLy8g6re466as6rOgIOuniOyasOyKpCDrk5zrnpjqt7jrpbwg7ZW07KCc7ZaI7J2EIOuVjCDrqYjstpTrj4TroZ0gKyDsupTrsoTsiqTrpbwg67KX7Ja064Ks7J2EIOuVjFxyXG5cclxubGV0IHBhaW50aW5nID0gZmFsc2U7XHJcbi8vIGZpbGwsIHBhaW507J2YIOyDge2DnOulvCDqsrDsoJXsp4DslrTso7zripQg67OA7IiY66W8IO2VmOuCmCDsg53shLFcclxubGV0IGZpbGxpbmcgPSBmYWxzZTtcclxuXHJcbmZ1bmN0aW9uIHN0YXJ0UGFpbnRpbmcoKSB7XHJcbiAgcGFpbnRpbmcgPSB0cnVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdG9wUGFpbnRpbmcoKSB7XHJcbiAgcGFpbnRpbmcgPSBmYWxzZTtcclxufVxyXG5cclxuY29uc3QgYmVnaW5QYXRoID0gKHgsIHkpID0+IHtcclxuICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgY3R4Lm1vdmVUbyh4LCB5KTtcclxufTtcclxuXHJcbmNvbnN0IHN0b3JrZVBhdGggPSAoeCwgeSwgY29sb3IgPSBudWxsKSA9PiB7XHJcbiAgY29uc3QgY3VycmVudENvbG9yID0gY3R4LnN0cm9rZVN0eWxlO1xyXG4gIGlmIChjb2xvciAhPT0gbnVsbCkge1xyXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XHJcbiAgfVxyXG4gIGN0eC5saW5lVG8oeCwgeSk7XHJcbiAgY3R4LnN0cm9rZSgpO1xyXG4gIGN0eC5zdHJva2VTdHlsZSA9IGN1cnJlbnRDb2xvcjtcclxufTtcclxuXHJcbmZ1bmN0aW9uIG9uTW91c2VNb3ZlKGV2ZW50KSB7XHJcbiAgY29uc3QgeCA9IGV2ZW50Lm9mZnNldFg7XHJcbiAgY29uc3QgeSA9IGV2ZW50Lm9mZnNldFk7XHJcbiAgaWYgKCFwYWludGluZykge1xyXG4gICAgYmVnaW5QYXRoKHgsIHkpO1xyXG4gICAgZ2V0U29ja2V0KCkuZW1pdCh3aW5kb3cuZXZlbnRzLmJlZ2luUGF0aCwgeyB4LCB5IH0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBzdG9ya2VQYXRoKHgsIHkpO1xyXG4gICAgZ2V0U29ja2V0KCkuZW1pdCh3aW5kb3cuZXZlbnRzLnN0cm9rZVBhdGgsIHtcclxuICAgICAgeCxcclxuICAgICAgeSxcclxuICAgICAgY29sb3I6IGN0eC5zdHJva2VTdHlsZSxcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaGFuZGxlQ29sb3JDbGljayhldmVudCkge1xyXG4gIGNvbnN0IGNvbG9yID0gZXZlbnQudGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvcjtcclxuICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcclxuICBjdHguZmlsbFN0eWxlID0gY29sb3I7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhbmRsZVJhbmdlQ2hhbmdlKGV2ZW50KSB7XHJcbiAgY29uc3Qgc2l6ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICBjdHgubGluZVdpZHRoID0gc2l6ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGFuZGxlTW9kZUNsaWNrKCkge1xyXG4gIGlmIChmaWxsaW5nID09PSB0cnVlKSB7XHJcbiAgICBmaWxsaW5nID0gZmFsc2U7XHJcbiAgICBtb2RlLmlubmVyVGV4dCA9ICdGaWxsJztcclxuICB9IGVsc2Uge1xyXG4gICAgZmlsbGluZyA9IHRydWU7XHJcbiAgICBtb2RlLmlubmVyVGV4dCA9ICdQYWludGluZyc7XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBmaWxsQ2FudmFzID0gKGNvbG9yID0gbnVsbCkgPT4ge1xyXG4gIGNvbnN0IGN1cnJlbnRDb2xvciA9IGN0eC5maWxsU3R5bGU7XHJcbiAgaWYgKGNvbG9yICE9PSBudWxsKSB7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgfVxyXG4gIGN0eC5maWxsUmVjdCgwLCAwLCBDQU5WQVNfU0laRSwgQ0FOVkFTX1NJWkUpO1xyXG4gIGN0eC5maWxsU3R5bGUgPSBjdXJyZW50Q29sb3I7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVDYW52YXNDbGljaygpIHtcclxuICBpZiAoZmlsbGluZykge1xyXG4gICAgZmlsbENhbnZhcygpO1xyXG4gICAgZ2V0U29ja2V0KCkuZW1pdCh3aW5kb3cuZXZlbnRzLmZpbGwsIHsgY29sb3I6IGN0eC5maWxsU3R5bGUgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVDTShldmVudCkge1xyXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbn1cclxuXHJcbmNvbnN0IGZpbGxDbGVhciA9ICgpID0+IHtcclxuICBjb25zdCBjdXJyZW50Q29sb3IgPSBjdHguZmlsbFN0eWxlO1xyXG4gIGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xyXG4gIGZpbGxDYW52YXMoKTtcclxuICBjdHguZmlsbFN0eWxlID0gY3VycmVudENvbG9yO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gaGFuZGxlQ2xlYXJDYW52YXMoKSB7XHJcbiAgZmlsbENsZWFyKCk7XHJcbiAgZ2V0U29ja2V0KCkuZW1pdCh3aW5kb3cuZXZlbnRzLmZpbGxDbGVhcik7XHJcbn1cclxuXHJcbmlmIChjYW52YXMpIHtcclxuICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVDYW52YXNDbGljayk7XHJcbiAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlKTtcclxuICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgc3RhcnRQYWludGluZyk7XHJcbiAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBzdG9wUGFpbnRpbmcpO1xyXG4gIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgc3RvcFBhaW50aW5nKTtcclxuICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCBoYW5kbGVDTSk7XHJcbn1cclxuXHJcbmlmIChjb2xvcnMpIHtcclxuICBBcnJheS5mcm9tKGNvbG9ycykuZm9yRWFjaChjb2xvciA9PlxyXG4gICAgY29sb3IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVDb2xvckNsaWNrKSxcclxuICApO1xyXG59XHJcblxyXG5pZiAocmFuZ2UpIHtcclxuICByYW5nZS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGhhbmRsZVJhbmdlQ2hhbmdlKTtcclxufVxyXG5cclxuaWYgKG1vZGUpIHtcclxuICBtb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlTW9kZUNsaWNrKTtcclxufVxyXG5cclxuaWYgKGNsZWFyQnRuKSB7XHJcbiAgY2xlYXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVDbGVhckNhbnZhcyk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVCZWdhblBhdGggPSAoeyB4LCB5IH0pID0+IGJlZ2luUGF0aCh4LCB5KTtcclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVTdHJva2VkUGF0aCA9ICh7IHgsIHksIGNvbG9yIH0pID0+IHN0b3JrZVBhdGgoeCwgeSwgY29sb3IpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGhhbmRsZUZpbGxlZCA9ICh7IGNvbG9yIH0pID0+IGZpbGxDYW52YXMoY29sb3IpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGhhbmRsZUZpbGxDbGVhcmVkID0gKCkgPT4gZmlsbENsZWFyKCk7XHJcbiJdfQ==
},{"./sockets":6}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleNewMsg = exports.appendMsg = void 0;

var _sockets = require("./sockets");

var messages = document.getElementById('jsMessages');
var sendMsg = document.getElementById('jsSendMsg'); // 사용자 화면에 메세지 출력해주는 함수

var appendMsg = function appendMsg(text, nickname) {
  var li = document.createElement('li');
  li.innerHTML = "<span class=\"author ".concat(nickname ? 'out' : 'self', "\"> ").concat(nickname ? nickname : 'You', ": </span>").concat(text);
  messages.appendChild(li);
};

exports.appendMsg = appendMsg;

var handleNewMsg = function handleNewMsg(_ref) {
  var message = _ref.message,
      nickname = _ref.nickname;
  appendMsg(message, nickname);
};

exports.handleNewMsg = handleNewMsg;

var handleSendMsg = function handleSendMsg(event) {
  // 기존 submit 이벤트 막기
  event.preventDefault(); // form 태그 안에 있는 input 태그 찾기

  var input = event.target.querySelector('input');
  var value = input.value; // Server Side로 메세지 전송 및 이벤트 발생

  var _window = window,
      events = _window.events;
  (0, _sockets.getSocket)().emit(events.sendMsg, {
    message: value
  });
  appendMsg(value);
  input.value = '';
};

if (sendMsg) {
  sendMsg.addEventListener('submit', handleSendMsg);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYXQuanMiXSwibmFtZXMiOlsibWVzc2FnZXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwic2VuZE1zZyIsImFwcGVuZE1zZyIsInRleHQiLCJuaWNrbmFtZSIsImxpIiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsImFwcGVuZENoaWxkIiwiaGFuZGxlTmV3TXNnIiwibWVzc2FnZSIsImhhbmRsZVNlbmRNc2ciLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiaW5wdXQiLCJ0YXJnZXQiLCJxdWVyeVNlbGVjdG9yIiwidmFsdWUiLCJ3aW5kb3ciLCJldmVudHMiLCJlbWl0IiwiYWRkRXZlbnRMaXN0ZW5lciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVBLElBQU1BLFFBQVEsR0FBR0MsUUFBUSxDQUFDQyxjQUFULENBQXdCLFlBQXhCLENBQWpCO0FBQ0EsSUFBTUMsT0FBTyxHQUFHRixRQUFRLENBQUNDLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBaEIsQyxDQUVBOztBQUNPLElBQU1FLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUNDLElBQUQsRUFBT0MsUUFBUCxFQUFvQjtBQUMzQyxNQUFNQyxFQUFFLEdBQUdOLFFBQVEsQ0FBQ08sYUFBVCxDQUF1QixJQUF2QixDQUFYO0FBQ0FELEVBQUFBLEVBQUUsQ0FBQ0UsU0FBSCxrQ0FBc0NILFFBQVEsR0FBRyxLQUFILEdBQVcsTUFBekQsaUJBQ0VBLFFBQVEsR0FBR0EsUUFBSCxHQUFjLEtBRHhCLHNCQUVZRCxJQUZaO0FBR0FMLEVBQUFBLFFBQVEsQ0FBQ1UsV0FBVCxDQUFxQkgsRUFBckI7QUFDRCxDQU5NOzs7O0FBUUEsSUFBTUksWUFBWSxHQUFHLFNBQWZBLFlBQWUsT0FBMkI7QUFBQSxNQUF4QkMsT0FBd0IsUUFBeEJBLE9BQXdCO0FBQUEsTUFBZk4sUUFBZSxRQUFmQSxRQUFlO0FBQ3JERixFQUFBQSxTQUFTLENBQUNRLE9BQUQsRUFBVU4sUUFBVixDQUFUO0FBQ0QsQ0FGTTs7OztBQUlQLElBQU1PLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBQUMsS0FBSyxFQUFJO0FBQzdCO0FBQ0FBLEVBQUFBLEtBQUssQ0FBQ0MsY0FBTixHQUY2QixDQUk3Qjs7QUFDQSxNQUFNQyxLQUFLLEdBQUdGLEtBQUssQ0FBQ0csTUFBTixDQUFhQyxhQUFiLENBQTJCLE9BQTNCLENBQWQ7QUFMNkIsTUFNckJDLEtBTnFCLEdBTVhILEtBTlcsQ0FNckJHLEtBTnFCLEVBUTdCOztBQVI2QixnQkFTVkMsTUFUVTtBQUFBLE1BU3JCQyxNQVRxQixXQVNyQkEsTUFUcUI7QUFVN0IsNEJBQVlDLElBQVosQ0FBaUJELE1BQU0sQ0FBQ2xCLE9BQXhCLEVBQWlDO0FBQUVTLElBQUFBLE9BQU8sRUFBRU87QUFBWCxHQUFqQztBQUNBZixFQUFBQSxTQUFTLENBQUNlLEtBQUQsQ0FBVDtBQUNBSCxFQUFBQSxLQUFLLENBQUNHLEtBQU4sR0FBYyxFQUFkO0FBQ0QsQ0FiRDs7QUFlQSxJQUFJaEIsT0FBSixFQUFhO0FBQ1hBLEVBQUFBLE9BQU8sQ0FBQ29CLGdCQUFSLENBQXlCLFFBQXpCLEVBQW1DVixhQUFuQztBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0U29ja2V0IH0gZnJvbSAnLi9zb2NrZXRzJztcclxuXHJcbmNvbnN0IG1lc3NhZ2VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzTWVzc2FnZXMnKTtcclxuY29uc3Qgc2VuZE1zZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqc1NlbmRNc2cnKTtcclxuXHJcbi8vIOyCrOyaqeyekCDtmZTrqbTsl5Ag66mU7IS47KeAIOy2nOugpe2VtOyjvOuKlCDtlajsiJhcclxuZXhwb3J0IGNvbnN0IGFwcGVuZE1zZyA9ICh0ZXh0LCBuaWNrbmFtZSkgPT4ge1xyXG4gIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICBsaS5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJhdXRob3IgJHtuaWNrbmFtZSA/ICdvdXQnIDogJ3NlbGYnfVwiPiAke1xyXG4gICAgbmlja25hbWUgPyBuaWNrbmFtZSA6ICdZb3UnXHJcbiAgfTogPC9zcGFuPiR7dGV4dH1gO1xyXG4gIG1lc3NhZ2VzLmFwcGVuZENoaWxkKGxpKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVOZXdNc2cgPSAoeyBtZXNzYWdlLCBuaWNrbmFtZSB9KSA9PiB7XHJcbiAgYXBwZW5kTXNnKG1lc3NhZ2UsIG5pY2tuYW1lKTtcclxufTtcclxuXHJcbmNvbnN0IGhhbmRsZVNlbmRNc2cgPSBldmVudCA9PiB7XHJcbiAgLy8g6riw7KG0IHN1Ym1pdCDsnbTrsqTtirgg66eJ6riwXHJcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgLy8gZm9ybSDtg5zqt7gg7JWI7JeQIOyeiOuKlCBpbnB1dCDtg5zqt7gg7LC+6riwXHJcbiAgY29uc3QgaW5wdXQgPSBldmVudC50YXJnZXQucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcclxuICBjb25zdCB7IHZhbHVlIH0gPSBpbnB1dDtcclxuXHJcbiAgLy8gU2VydmVyIFNpZGXroZwg66mU7IS47KeAIOyghOyGoSDrsI8g7J2067Kk7Yq4IOuwnOyDnVxyXG4gIGNvbnN0IHsgZXZlbnRzIH0gPSB3aW5kb3c7XHJcbiAgZ2V0U29ja2V0KCkuZW1pdChldmVudHMuc2VuZE1zZywgeyBtZXNzYWdlOiB2YWx1ZSB9KTtcclxuICBhcHBlbmRNc2codmFsdWUpO1xyXG4gIGlucHV0LnZhbHVlID0gJyc7XHJcbn07XHJcblxyXG5pZiAoc2VuZE1zZykge1xyXG4gIHNlbmRNc2cuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgaGFuZGxlU2VuZE1zZyk7XHJcbn1cclxuIl19
},{"./sockets":6}],3:[function(require,module,exports){
"use strict";

require("./sockets");

require("./login");

require("./chat");

require("./canvas");
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfNjYxOWZkZi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOztBQUNBOztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL3NvY2tldHMnO1xyXG5pbXBvcnQgJy4vbG9naW4nO1xyXG5pbXBvcnQgJy4vY2hhdCc7XHJcbmltcG9ydCAnLi9jYW52YXMnO1xyXG4iXX0=
},{"./canvas":1,"./chat":2,"./login":4,"./sockets":6}],4:[function(require,module,exports){
"use strict";

var _sockets = require("./sockets");

var body = document.querySelector('body');
var loginForm = document.getElementById('jsLogin');
var LOGGED_IN = 'loggedIn';
var LOGGED_OUT = 'loggedOut';
var NICKNAME = 'nickname';
var nickname = localStorage.getItem(NICKNAME);

var logIn = function logIn(nickName) {
  // eslint-disable-next-line no-undef
  var socket = io('/');
  socket.emit(window.events.setNickname, {
    nickname: nickName
  });
  (0, _sockets.initSockets)(socket);
};

if (nickname === null) {
  body.className = LOGGED_OUT;
} else {
  body.className = LOGGED_IN;
  logIn(nickname);
}

var handleFormSubmit = function handleFormSubmit(event) {
  event.preventDefault();
  var input = loginForm.querySelector('input');
  localStorage.setItem(NICKNAME, input.value);
  body.className = LOGGED_IN;
  logIn(input.value);
  input.value = '';
};

if (loginForm) {
  loginForm.addEventListener('submit', handleFormSubmit);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImJvZHkiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJsb2dpbkZvcm0iLCJnZXRFbGVtZW50QnlJZCIsIkxPR0dFRF9JTiIsIkxPR0dFRF9PVVQiLCJOSUNLTkFNRSIsIm5pY2tuYW1lIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImxvZ0luIiwibmlja05hbWUiLCJzb2NrZXQiLCJpbyIsImVtaXQiLCJ3aW5kb3ciLCJldmVudHMiLCJzZXROaWNrbmFtZSIsImNsYXNzTmFtZSIsImhhbmRsZUZvcm1TdWJtaXQiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiaW5wdXQiLCJzZXRJdGVtIiwidmFsdWUiLCJhZGRFdmVudExpc3RlbmVyIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBLElBQU1BLElBQUksR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLE1BQXZCLENBQWI7QUFDQSxJQUFNQyxTQUFTLEdBQUdGLFFBQVEsQ0FBQ0csY0FBVCxDQUF3QixTQUF4QixDQUFsQjtBQUVBLElBQU1DLFNBQVMsR0FBRyxVQUFsQjtBQUNBLElBQU1DLFVBQVUsR0FBRyxXQUFuQjtBQUNBLElBQU1DLFFBQVEsR0FBRyxVQUFqQjtBQUVBLElBQU1DLFFBQVEsR0FBR0MsWUFBWSxDQUFDQyxPQUFiLENBQXFCSCxRQUFyQixDQUFqQjs7QUFFQSxJQUFNSSxLQUFLLEdBQUcsU0FBUkEsS0FBUSxDQUFBQyxRQUFRLEVBQUk7QUFDeEI7QUFDQSxNQUFNQyxNQUFNLEdBQUdDLEVBQUUsQ0FBQyxHQUFELENBQWpCO0FBQ0FELEVBQUFBLE1BQU0sQ0FBQ0UsSUFBUCxDQUFZQyxNQUFNLENBQUNDLE1BQVAsQ0FBY0MsV0FBMUIsRUFBdUM7QUFBRVYsSUFBQUEsUUFBUSxFQUFFSTtBQUFaLEdBQXZDO0FBQ0EsNEJBQVlDLE1BQVo7QUFDRCxDQUxEOztBQU9BLElBQUlMLFFBQVEsS0FBSyxJQUFqQixFQUF1QjtBQUNyQlIsRUFBQUEsSUFBSSxDQUFDbUIsU0FBTCxHQUFpQmIsVUFBakI7QUFDRCxDQUZELE1BRU87QUFDTE4sRUFBQUEsSUFBSSxDQUFDbUIsU0FBTCxHQUFpQmQsU0FBakI7QUFDQU0sRUFBQUEsS0FBSyxDQUFDSCxRQUFELENBQUw7QUFDRDs7QUFFRCxJQUFNWSxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CLENBQUFDLEtBQUssRUFBSTtBQUNoQ0EsRUFBQUEsS0FBSyxDQUFDQyxjQUFOO0FBQ0EsTUFBTUMsS0FBSyxHQUFHcEIsU0FBUyxDQUFDRCxhQUFWLENBQXdCLE9BQXhCLENBQWQ7QUFDQU8sRUFBQUEsWUFBWSxDQUFDZSxPQUFiLENBQXFCakIsUUFBckIsRUFBK0JnQixLQUFLLENBQUNFLEtBQXJDO0FBQ0F6QixFQUFBQSxJQUFJLENBQUNtQixTQUFMLEdBQWlCZCxTQUFqQjtBQUNBTSxFQUFBQSxLQUFLLENBQUNZLEtBQUssQ0FBQ0UsS0FBUCxDQUFMO0FBQ0FGLEVBQUFBLEtBQUssQ0FBQ0UsS0FBTixHQUFjLEVBQWQ7QUFDRCxDQVBEOztBQVNBLElBQUl0QixTQUFKLEVBQWU7QUFDYkEsRUFBQUEsU0FBUyxDQUFDdUIsZ0JBQVYsQ0FBMkIsUUFBM0IsRUFBcUNOLGdCQUFyQztBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5pdFNvY2tldHMgfSBmcm9tICcuL3NvY2tldHMnO1xyXG5cclxuY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuY29uc3QgbG9naW5Gb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzTG9naW4nKTtcclxuXHJcbmNvbnN0IExPR0dFRF9JTiA9ICdsb2dnZWRJbic7XHJcbmNvbnN0IExPR0dFRF9PVVQgPSAnbG9nZ2VkT3V0JztcclxuY29uc3QgTklDS05BTUUgPSAnbmlja25hbWUnO1xyXG5cclxuY29uc3Qgbmlja25hbWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShOSUNLTkFNRSk7XHJcblxyXG5jb25zdCBsb2dJbiA9IG5pY2tOYW1lID0+IHtcclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcclxuICBjb25zdCBzb2NrZXQgPSBpbygnLycpO1xyXG4gIHNvY2tldC5lbWl0KHdpbmRvdy5ldmVudHMuc2V0Tmlja25hbWUsIHsgbmlja25hbWU6IG5pY2tOYW1lIH0pO1xyXG4gIGluaXRTb2NrZXRzKHNvY2tldCk7XHJcbn07XHJcblxyXG5pZiAobmlja25hbWUgPT09IG51bGwpIHtcclxuICBib2R5LmNsYXNzTmFtZSA9IExPR0dFRF9PVVQ7XHJcbn0gZWxzZSB7XHJcbiAgYm9keS5jbGFzc05hbWUgPSBMT0dHRURfSU47XHJcbiAgbG9nSW4obmlja25hbWUpO1xyXG59XHJcblxyXG5jb25zdCBoYW5kbGVGb3JtU3VibWl0ID0gZXZlbnQgPT4ge1xyXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgY29uc3QgaW5wdXQgPSBsb2dpbkZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShOSUNLTkFNRSwgaW5wdXQudmFsdWUpO1xyXG4gIGJvZHkuY2xhc3NOYW1lID0gTE9HR0VEX0lOO1xyXG4gIGxvZ0luKGlucHV0LnZhbHVlKTtcclxuICBpbnB1dC52YWx1ZSA9ICcnO1xyXG59O1xyXG5cclxuaWYgKGxvZ2luRm9ybSkge1xyXG4gIGxvZ2luRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBoYW5kbGVGb3JtU3VibWl0KTtcclxufVxyXG4iXX0=
},{"./sockets":6}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleDisconnect = exports.handleNewUser = void 0;
var body = document.querySelector('body');

var fireNotification = function fireNotification(text, color) {
  var notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = text;
  notification.style.backgroundColor = color;
  body.appendChild(notification);
}; // 새로운 유저가 로그인 했을 때 알림


var handleNewUser = function handleNewUser(_ref) {
  var nickname = _ref.nickname;
  console.log("".concat(nickname, " login !"));
  fireNotification("".concat(nickname, " just joined!"), 'rgb(76, 217, 100)');
};

exports.handleNewUser = handleNewUser;

var handleDisconnect = function handleDisconnect(_ref2) {
  var nickname = _ref2.nickname;
  console.log("".concat(nickname, " left !"));
  fireNotification("".concat(nickname, " just lefted!"), 'rgb(255, 204, 0)');
};

exports.handleDisconnect = handleDisconnect;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vdGlmaWNhdGlvbnMuanMiXSwibmFtZXMiOlsiYm9keSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImZpcmVOb3RpZmljYXRpb24iLCJ0ZXh0IiwiY29sb3IiLCJub3RpZmljYXRpb24iLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiaW5uZXJIVE1MIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJhcHBlbmRDaGlsZCIsImhhbmRsZU5ld1VzZXIiLCJuaWNrbmFtZSIsImNvbnNvbGUiLCJsb2ciLCJoYW5kbGVEaXNjb25uZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFNQSxJQUFJLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixNQUF2QixDQUFiOztBQUVBLElBQU1DLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUIsQ0FBQ0MsSUFBRCxFQUFPQyxLQUFQLEVBQWlCO0FBQ3hDLE1BQU1DLFlBQVksR0FBR0wsUUFBUSxDQUFDTSxhQUFULENBQXVCLEtBQXZCLENBQXJCO0FBQ0FELEVBQUFBLFlBQVksQ0FBQ0UsU0FBYixHQUF5QixjQUF6QjtBQUNBRixFQUFBQSxZQUFZLENBQUNHLFNBQWIsR0FBeUJMLElBQXpCO0FBQ0FFLEVBQUFBLFlBQVksQ0FBQ0ksS0FBYixDQUFtQkMsZUFBbkIsR0FBcUNOLEtBQXJDO0FBQ0FMLEVBQUFBLElBQUksQ0FBQ1ksV0FBTCxDQUFpQk4sWUFBakI7QUFDRCxDQU5ELEMsQ0FRQTs7O0FBQ08sSUFBTU8sYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixPQUFrQjtBQUFBLE1BQWZDLFFBQWUsUUFBZkEsUUFBZTtBQUM3Q0MsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLFdBQWVGLFFBQWY7QUFDQVgsRUFBQUEsZ0JBQWdCLFdBQUlXLFFBQUosb0JBQTZCLG1CQUE3QixDQUFoQjtBQUNELENBSE07Ozs7QUFLQSxJQUFNRyxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CLFFBQWtCO0FBQUEsTUFBZkgsUUFBZSxTQUFmQSxRQUFlO0FBQ2hEQyxFQUFBQSxPQUFPLENBQUNDLEdBQVIsV0FBZUYsUUFBZjtBQUNBWCxFQUFBQSxnQkFBZ0IsV0FBSVcsUUFBSixvQkFBNkIsa0JBQTdCLENBQWhCO0FBQ0QsQ0FITSIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcblxyXG5jb25zdCBmaXJlTm90aWZpY2F0aW9uID0gKHRleHQsIGNvbG9yKSA9PiB7XHJcbiAgY29uc3Qgbm90aWZpY2F0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgbm90aWZpY2F0aW9uLmNsYXNzTmFtZSA9ICdub3RpZmljYXRpb24nO1xyXG4gIG5vdGlmaWNhdGlvbi5pbm5lckhUTUwgPSB0ZXh0O1xyXG4gIG5vdGlmaWNhdGlvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcjtcclxuICBib2R5LmFwcGVuZENoaWxkKG5vdGlmaWNhdGlvbik7XHJcbn07XHJcblxyXG4vLyDsg4jroZzsmrQg7Jyg7KCA6rCAIOuhnOq3uOyduCDtlojsnYQg65WMIOyVjOumvFxyXG5leHBvcnQgY29uc3QgaGFuZGxlTmV3VXNlciA9ICh7IG5pY2tuYW1lIH0pID0+IHtcclxuICBjb25zb2xlLmxvZyhgJHtuaWNrbmFtZX0gbG9naW4gIWApO1xyXG4gIGZpcmVOb3RpZmljYXRpb24oYCR7bmlja25hbWV9IGp1c3Qgam9pbmVkIWAsICdyZ2IoNzYsIDIxNywgMTAwKScpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGhhbmRsZURpc2Nvbm5lY3QgPSAoeyBuaWNrbmFtZSB9KSA9PiB7XHJcbiAgY29uc29sZS5sb2coYCR7bmlja25hbWV9IGxlZnQgIWApO1xyXG4gIGZpcmVOb3RpZmljYXRpb24oYCR7bmlja25hbWV9IGp1c3QgbGVmdGVkIWAsICdyZ2IoMjU1LCAyMDQsIDApJyk7XHJcbn07XHJcbiJdfQ==
},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSockets = exports.getSocket = void 0;

var _notifications = require("./notifications");

var _chat = require("./chat");

var _canvas = require("./canvas");

var socket = null;

var getSocket = function getSocket() {
  return socket;
};

exports.getSocket = getSocket;

var initSockets = function initSockets(aSocket) {
  var _window = window,
      events = _window.events;
  console.log('initSocket!');
  socket = aSocket;
  socket.on(events.newUser, _notifications.handleNewUser);
  socket.on(events.disconnected, _notifications.handleDisconnect);
  socket.on(events.newMsg, _chat.handleNewMsg);
  socket.on(events.beganPath, _canvas.handleBeganPath);
  socket.on(events.strokedPath, _canvas.handleStrokedPath);
  socket.on(events.filled, _canvas.handleFilled);
  socket.on(events.fillCleared, _canvas.handleFillCleared);
};

exports.initSockets = initSockets;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNvY2tldHMuanMiXSwibmFtZXMiOlsic29ja2V0IiwiZ2V0U29ja2V0IiwiaW5pdFNvY2tldHMiLCJhU29ja2V0Iiwid2luZG93IiwiZXZlbnRzIiwiY29uc29sZSIsImxvZyIsIm9uIiwibmV3VXNlciIsImhhbmRsZU5ld1VzZXIiLCJkaXNjb25uZWN0ZWQiLCJoYW5kbGVEaXNjb25uZWN0IiwibmV3TXNnIiwiaGFuZGxlTmV3TXNnIiwiYmVnYW5QYXRoIiwiaGFuZGxlQmVnYW5QYXRoIiwic3Ryb2tlZFBhdGgiLCJoYW5kbGVTdHJva2VkUGF0aCIsImZpbGxlZCIsImhhbmRsZUZpbGxlZCIsImZpbGxDbGVhcmVkIiwiaGFuZGxlRmlsbENsZWFyZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFPQSxJQUFJQSxNQUFNLEdBQUcsSUFBYjs7QUFFTyxJQUFNQyxTQUFTLEdBQUcsU0FBWkEsU0FBWTtBQUFBLFNBQU1ELE1BQU47QUFBQSxDQUFsQjs7OztBQUVBLElBQU1FLFdBQVcsR0FBRyxTQUFkQSxXQUFjLENBQUFDLE9BQU8sRUFBSTtBQUFBLGdCQUNqQkMsTUFEaUI7QUFBQSxNQUM1QkMsTUFENEIsV0FDNUJBLE1BRDRCO0FBRXBDQyxFQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxhQUFaO0FBQ0FQLEVBQUFBLE1BQU0sR0FBR0csT0FBVDtBQUNBSCxFQUFBQSxNQUFNLENBQUNRLEVBQVAsQ0FBVUgsTUFBTSxDQUFDSSxPQUFqQixFQUEwQkMsNEJBQTFCO0FBQ0FWLEVBQUFBLE1BQU0sQ0FBQ1EsRUFBUCxDQUFVSCxNQUFNLENBQUNNLFlBQWpCLEVBQStCQywrQkFBL0I7QUFDQVosRUFBQUEsTUFBTSxDQUFDUSxFQUFQLENBQVVILE1BQU0sQ0FBQ1EsTUFBakIsRUFBeUJDLGtCQUF6QjtBQUNBZCxFQUFBQSxNQUFNLENBQUNRLEVBQVAsQ0FBVUgsTUFBTSxDQUFDVSxTQUFqQixFQUE0QkMsdUJBQTVCO0FBQ0FoQixFQUFBQSxNQUFNLENBQUNRLEVBQVAsQ0FBVUgsTUFBTSxDQUFDWSxXQUFqQixFQUE4QkMseUJBQTlCO0FBQ0FsQixFQUFBQSxNQUFNLENBQUNRLEVBQVAsQ0FBVUgsTUFBTSxDQUFDYyxNQUFqQixFQUF5QkMsb0JBQXpCO0FBQ0FwQixFQUFBQSxNQUFNLENBQUNRLEVBQVAsQ0FBVUgsTUFBTSxDQUFDZ0IsV0FBakIsRUFBOEJDLHlCQUE5QjtBQUNELENBWE0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoYW5kbGVOZXdVc2VyLCBoYW5kbGVEaXNjb25uZWN0IH0gZnJvbSAnLi9ub3RpZmljYXRpb25zJztcclxuaW1wb3J0IHsgaGFuZGxlTmV3TXNnIH0gZnJvbSAnLi9jaGF0JztcclxuaW1wb3J0IHtcclxuICBoYW5kbGVCZWdhblBhdGgsXHJcbiAgaGFuZGxlU3Ryb2tlZFBhdGgsXHJcbiAgaGFuZGxlRmlsbGVkLFxyXG4gIGhhbmRsZUZpbGxDbGVhcmVkLFxyXG59IGZyb20gJy4vY2FudmFzJztcclxuXHJcbmxldCBzb2NrZXQgPSBudWxsO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFNvY2tldCA9ICgpID0+IHNvY2tldDtcclxuXHJcbmV4cG9ydCBjb25zdCBpbml0U29ja2V0cyA9IGFTb2NrZXQgPT4ge1xyXG4gIGNvbnN0IHsgZXZlbnRzIH0gPSB3aW5kb3c7XHJcbiAgY29uc29sZS5sb2coJ2luaXRTb2NrZXQhJyk7XHJcbiAgc29ja2V0ID0gYVNvY2tldDtcclxuICBzb2NrZXQub24oZXZlbnRzLm5ld1VzZXIsIGhhbmRsZU5ld1VzZXIpO1xyXG4gIHNvY2tldC5vbihldmVudHMuZGlzY29ubmVjdGVkLCBoYW5kbGVEaXNjb25uZWN0KTtcclxuICBzb2NrZXQub24oZXZlbnRzLm5ld01zZywgaGFuZGxlTmV3TXNnKTtcclxuICBzb2NrZXQub24oZXZlbnRzLmJlZ2FuUGF0aCwgaGFuZGxlQmVnYW5QYXRoKTtcclxuICBzb2NrZXQub24oZXZlbnRzLnN0cm9rZWRQYXRoLCBoYW5kbGVTdHJva2VkUGF0aCk7XHJcbiAgc29ja2V0Lm9uKGV2ZW50cy5maWxsZWQsIGhhbmRsZUZpbGxlZCk7XHJcbiAgc29ja2V0Lm9uKGV2ZW50cy5maWxsQ2xlYXJlZCwgaGFuZGxlRmlsbENsZWFyZWQpO1xyXG59O1xyXG4iXX0=
},{"./canvas":1,"./chat":2,"./notifications":5}]},{},[3])