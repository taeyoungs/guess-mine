(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var body = document.querySelector('body');
var loginForm = document.getElementById('jsLogin');
var LOGGED_IN = 'loggedIn';
var LOGGED_OUT = 'loggedOut';
var NICKNAME = 'nickname';
var nickname = localStorage.getItem(NICKNAME);

if (nickname === null) {
  body.className = LOGGED_IN;
} else {
  body.className = LOGGED_OUT;
}

var handleFormSubmit = function handleFormSubmit(event) {
  event.preventDefault();
  var input = loginForm.querySelector('input');
  console.log(input.value);
  input.value = '';
  localStorage.setItem(NICKNAME, input.value);
};

if (loginForm) {
  loginForm.addEventListener('submit', handleFormSubmit);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfNmUxZWQ4ZGUuanMiXSwibmFtZXMiOlsiYm9keSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImxvZ2luRm9ybSIsImdldEVsZW1lbnRCeUlkIiwiTE9HR0VEX0lOIiwiTE9HR0VEX09VVCIsIk5JQ0tOQU1FIiwibmlja25hbWUiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiY2xhc3NOYW1lIiwiaGFuZGxlRm9ybVN1Ym1pdCIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJpbnB1dCIsImNvbnNvbGUiLCJsb2ciLCJ2YWx1ZSIsInNldEl0ZW0iLCJhZGRFdmVudExpc3RlbmVyIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQU1BLElBQUksR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLE1BQXZCLENBQWI7QUFDQSxJQUFNQyxTQUFTLEdBQUdGLFFBQVEsQ0FBQ0csY0FBVCxDQUF3QixTQUF4QixDQUFsQjtBQUVBLElBQU1DLFNBQVMsR0FBRyxVQUFsQjtBQUNBLElBQU1DLFVBQVUsR0FBRyxXQUFuQjtBQUNBLElBQU1DLFFBQVEsR0FBRyxVQUFqQjtBQUVBLElBQU1DLFFBQVEsR0FBR0MsWUFBWSxDQUFDQyxPQUFiLENBQXFCSCxRQUFyQixDQUFqQjs7QUFFQSxJQUFJQyxRQUFRLEtBQUssSUFBakIsRUFBdUI7QUFDckJSLEVBQUFBLElBQUksQ0FBQ1csU0FBTCxHQUFpQk4sU0FBakI7QUFDRCxDQUZELE1BRU87QUFDTEwsRUFBQUEsSUFBSSxDQUFDVyxTQUFMLEdBQWlCTCxVQUFqQjtBQUNEOztBQUVELElBQU1NLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUIsQ0FBQUMsS0FBSyxFQUFJO0FBQ2hDQSxFQUFBQSxLQUFLLENBQUNDLGNBQU47QUFDQSxNQUFNQyxLQUFLLEdBQUdaLFNBQVMsQ0FBQ0QsYUFBVixDQUF3QixPQUF4QixDQUFkO0FBQ0FjLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRixLQUFLLENBQUNHLEtBQWxCO0FBQ0FILEVBQUFBLEtBQUssQ0FBQ0csS0FBTixHQUFjLEVBQWQ7QUFDQVQsRUFBQUEsWUFBWSxDQUFDVSxPQUFiLENBQXFCWixRQUFyQixFQUErQlEsS0FBSyxDQUFDRyxLQUFyQztBQUNELENBTkQ7O0FBUUEsSUFBSWYsU0FBSixFQUFlO0FBQ2JBLEVBQUFBLFNBQVMsQ0FBQ2lCLGdCQUFWLENBQTJCLFFBQTNCLEVBQXFDUixnQkFBckM7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcbmNvbnN0IGxvZ2luRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqc0xvZ2luJyk7XHJcblxyXG5jb25zdCBMT0dHRURfSU4gPSAnbG9nZ2VkSW4nO1xyXG5jb25zdCBMT0dHRURfT1VUID0gJ2xvZ2dlZE91dCc7XHJcbmNvbnN0IE5JQ0tOQU1FID0gJ25pY2tuYW1lJztcclxuXHJcbmNvbnN0IG5pY2tuYW1lID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oTklDS05BTUUpO1xyXG5cclxuaWYgKG5pY2tuYW1lID09PSBudWxsKSB7XHJcbiAgYm9keS5jbGFzc05hbWUgPSBMT0dHRURfSU47XHJcbn0gZWxzZSB7XHJcbiAgYm9keS5jbGFzc05hbWUgPSBMT0dHRURfT1VUO1xyXG59XHJcblxyXG5jb25zdCBoYW5kbGVGb3JtU3VibWl0ID0gZXZlbnQgPT4ge1xyXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgY29uc3QgaW5wdXQgPSBsb2dpbkZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcclxuICBjb25zb2xlLmxvZyhpbnB1dC52YWx1ZSk7XHJcbiAgaW5wdXQudmFsdWUgPSAnJztcclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShOSUNLTkFNRSwgaW5wdXQudmFsdWUpO1xyXG59O1xyXG5cclxuaWYgKGxvZ2luRm9ybSkge1xyXG4gIGxvZ2luRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBoYW5kbGVGb3JtU3VibWl0KTtcclxufVxyXG4iXX0=
},{}]},{},[1])