/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*********************************************!*\
  !*** multi ./src/main.js ./scss/index.scss ***!
  \*********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/main.js */1);
module.exports = __webpack_require__(/*! ./scss/index.scss */4);


/***/ }),
/* 1 */
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__todo_manager__ = __webpack_require__(/*! ./todo-manager */ 2);\n\n\nwindow.onload = () => {\n    let manager = new __WEBPACK_IMPORTED_MODULE_0__todo_manager__[\"a\" /* TodoManager */]();\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvbWFpbi5qcz8xYzkwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VG9kb01hbmFnZXJ9IGZyb20gJy4vdG9kby1tYW5hZ2VyJztcblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgICBsZXQgbWFuYWdlciA9IG5ldyBUb2RvTWFuYWdlcigpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9tYWluLmpzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///1\n");

/***/ }),
/* 2 */
/*!*****************************!*\
  !*** ./src/todo-manager.js ***!
  \*****************************/
/*! exports provided: TodoManager */
/*! exports used: TodoManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__todo__ = __webpack_require__(/*! ./todo */ 3);\n\n\nclass TodoManager {\n\n    constructor() {\n        this.todoList = [];\n        this.todoInput = document.getElementById('todoInput');\n        this.todoListView = document.getElementById('todoList');\n        document.addEventListener('keypress', e => this.processTodo(e)); //use an arrow function to maintain scope of `this` as class.\n    }\n\n    processTodo(e) {\n        if (e.keyCode === 13) {\n            let val = this.todoInput.value;\n            let todo = new __WEBPACK_IMPORTED_MODULE_0__todo__[\"a\" /* Todo */](val);\n            this.todoList.push(todo);\n            this.todoInput.value = '';\n            this.updateListView(todo);\n        }\n    }\n\n    updateListView(item) {\n        let entry = document.createElement('li');\n        let description = document.createElement('p');\n        let doneButton = document.createElement('input');\n        let deleteButton = document.createElement('i');\n        deleteButton.innerText = 'clear';\n        deleteButton.setAttribute('id', `${item.description}`);\n        deleteButton.addEventListener('click', e => this.removeItem(e));\n        deleteButton.classList.add('material-icons');\n        deleteButton.classList.add('delete__btn');\n        doneButton.setAttribute('name', `${item.description}`);\n        doneButton.setAttribute('type', 'checkbox');\n        doneButton.addEventListener('click', e => this.completeItem(e));\n        description.innerHTML = item.description;\n        description.classList.add('item__description');\n        doneButton.classList.add('done__btn');\n        entry.classList.add('list__item');\n        entry.appendChild(doneButton);\n        entry.appendChild(description);\n        entry.appendChild(deleteButton);\n        this.todoListView.appendChild(entry);\n    }\n\n    removeItem(e) {\n        let identifier = e.target.id;\n        let node = e.target.parentNode;\n        for (let [index, item] of this.todoList.entries()) {\n            if (item.description === identifier) {\n                this.todoList.splice(index, 1);\n                this.todoListView.removeChild(node);\n            }\n        }\n    }\n\n    completeItem(e) {\n        let identifier = e.target.name;\n        let sibling = e.target.nextSibling;\n        for (let [index, item] of this.todoList.entries()) {\n            if (item.description === identifier && !item.isFinished) {\n                item.isFinished = true;\n                sibling.classList.add('item__completed');\n            } else {\n                item.isFinished = false;\n                sibling.classList.remove('item__completed');\n            }\n        }\n    }\n}\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = TodoManager;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvdG9kby1tYW5hZ2VyLmpzP2QxMjMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUb2RvfSBmcm9tICcuL3RvZG8nO1xuXG5leHBvcnQgY2xhc3MgVG9kb01hbmFnZXIge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMudG9kb0xpc3QgPSBbXTtcbiAgICAgICAgdGhpcy50b2RvSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kb0lucHV0Jyk7XG4gICAgICAgIHRoaXMudG9kb0xpc3RWaWV3ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG9MaXN0Jyk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgZSA9PiB0aGlzLnByb2Nlc3NUb2RvKGUpKTsgLy91c2UgYW4gYXJyb3cgZnVuY3Rpb24gdG8gbWFpbnRhaW4gc2NvcGUgb2YgYHRoaXNgIGFzIGNsYXNzLlxuICAgIH1cblxuICAgIHByb2Nlc3NUb2RvKGUpIHtcbiAgICAgICAgaWYoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgICAgICAgbGV0IHZhbCA9IHRoaXMudG9kb0lucHV0LnZhbHVlO1xuICAgICAgICAgICAgbGV0IHRvZG8gPSBuZXcgVG9kbyh2YWwpO1xuICAgICAgICAgICAgdGhpcy50b2RvTGlzdC5wdXNoKHRvZG8pO1xuICAgICAgICAgICAgdGhpcy50b2RvSW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTGlzdFZpZXcodG9kbyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVMaXN0VmlldyhpdGVtKSB7XG4gICAgICAgIGxldCBlbnRyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgbGV0IGRvbmVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBsZXQgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICBkZWxldGVCdXR0b24uaW5uZXJUZXh0ID0gJ2NsZWFyJztcbiAgICAgICAgZGVsZXRlQnV0dG9uLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtpdGVtLmRlc2NyaXB0aW9ufWApO1xuICAgICAgICBkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHRoaXMucmVtb3ZlSXRlbShlKSk7XG4gICAgICAgIGRlbGV0ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucycpO1xuICAgICAgICBkZWxldGVCdXR0b24uY2xhc3NMaXN0LmFkZCgnZGVsZXRlX19idG4nKTtcbiAgICAgICAgZG9uZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ25hbWUnLCBgJHtpdGVtLmRlc2NyaXB0aW9ufWApO1xuICAgICAgICBkb25lQnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdjaGVja2JveCcpO1xuICAgICAgICBkb25lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB0aGlzLmNvbXBsZXRlSXRlbShlKSk7XG4gICAgICAgIGRlc2NyaXB0aW9uLmlubmVySFRNTCA9IGl0ZW0uZGVzY3JpcHRpb247XG4gICAgICAgIGRlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoJ2l0ZW1fX2Rlc2NyaXB0aW9uJyk7XG4gICAgICAgIGRvbmVCdXR0b24uY2xhc3NMaXN0LmFkZCgnZG9uZV9fYnRuJyk7XG4gICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2xpc3RfX2l0ZW0nKTtcbiAgICAgICAgZW50cnkuYXBwZW5kQ2hpbGQoZG9uZUJ1dHRvbik7XG4gICAgICAgIGVudHJ5LmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcbiAgICAgICAgZW50cnkuYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKTtcbiAgICAgICAgdGhpcy50b2RvTGlzdFZpZXcuYXBwZW5kQ2hpbGQoZW50cnkpO1xuICAgIH1cblxuICAgIHJlbW92ZUl0ZW0oZSkge1xuICAgICAgICBsZXQgaWRlbnRpZmllciA9IGUudGFyZ2V0LmlkO1xuICAgICAgICBsZXQgbm9kZSA9IGUudGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgICAgIGZvcihsZXQgW2luZGV4LCBpdGVtXSBvZiB0aGlzLnRvZG9MaXN0LmVudHJpZXMoKSkge1xuICAgICAgICAgICAgaWYgKGl0ZW0uZGVzY3JpcHRpb24gPT09IGlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvZG9MaXN0LnNwbGljZShpbmRleCwxKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvZG9MaXN0Vmlldy5yZW1vdmVDaGlsZChub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBsZXRlSXRlbShlKSB7XG4gICAgICAgIGxldCBpZGVudGlmaWVyID0gZS50YXJnZXQubmFtZTtcbiAgICAgICAgbGV0IHNpYmxpbmcgPSBlLnRhcmdldC5uZXh0U2libGluZztcbiAgICAgICAgZm9yKGxldCBbaW5kZXgsIGl0ZW1dIG9mIHRoaXMudG9kb0xpc3QuZW50cmllcygpKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5kZXNjcmlwdGlvbiA9PT0gaWRlbnRpZmllciAmJiAhaXRlbS5pc0ZpbmlzaGVkKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5pc0ZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzaWJsaW5nLmNsYXNzTGlzdC5hZGQoJ2l0ZW1fX2NvbXBsZXRlZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpdGVtLmlzRmluaXNoZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzaWJsaW5nLmNsYXNzTGlzdC5yZW1vdmUoJ2l0ZW1fX2NvbXBsZXRlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy90b2RvLW1hbmFnZXIuanMiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWpFQTs7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///2\n");

/***/ }),
/* 3 */
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/*! exports provided: Todo */
/*! exports used: Todo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("class Todo {\n    constructor(desc) {\n        this.description = desc;\n        this.isFinished = false;\n    }\n}\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = Todo;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvdG9kby5qcz84YjM3Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBUb2RvIHtcbiAgICBjb25zdHJ1Y3RvcihkZXNjKSB7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjO1xuICAgICAgICB0aGlzLmlzRmluaXNoZWQgPSBmYWxzZTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL3RvZG8uanMiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTs7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///3\n");

/***/ }),
/* 4 */
/*!*************************!*\
  !*** ./scss/index.scss ***!
  \*************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3Njc3MvaW5kZXguc2Nzcz9hZDRiIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zY3NzL2luZGV4LnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///4\n");

/***/ })
/******/ ]);