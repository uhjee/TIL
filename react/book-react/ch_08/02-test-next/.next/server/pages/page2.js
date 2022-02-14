"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/page2";
exports.ids = ["pages/page2"];
exports.modules = {

/***/ "./pages/page2.js":
/*!************************!*\
  !*** ./pages/page2.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Page2)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _src_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/api */ \"./src/api.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _src_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/util */ \"./src/util.js\");\n\n\n\n\n// getInitialProps 함수 정의 - 매개변수로 다양한 정보가 전달되지만 여기선 쿼리 파라미터만 사용\nPage2.getInitialProps = async ({ query  })=>{\n    // dynamic import\n    const { sayHello  } = await __webpack_require__.e(/*! import() */ \"src_sayHello_js\").then(__webpack_require__.bind(__webpack_require__, /*! ../src/sayHello */ \"./src/sayHello.js\"));\n    console.log(sayHello());\n    // throw new Error('exception in getInitialProps');\n    const text = query.text || 'none'; // 쿼리 파라미터로부터 text 변수 생성\n    const data = await (0,_src_api__WEBPACK_IMPORTED_MODULE_1__.callApi)(); // 데이터를 가져오기 위해 API 호출 - (서버 | 클라이언트)에서 호출\n    return {\n        text,\n        data\n    }; // getInitialProps 함수의  return 값은 페이지 컴포넌트의 props 값으로 전달\n};\nfunction Page2({ text , data  }) {\n    // function onClick() {\n    //   // Dynamic Import\n    //   import('../src/sayHello').then(({ sayHello }) => console.log(sayHello()));\n    // }\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: \"this is home page2\"\n            }, void 0, false, {\n                fileName: \"/Users/uhjee/Desktop/git_remote/TIL/react/book-react/ch_08/02-test-next/pages/page2.js\",\n                lineNumber: 27,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: `text: ${text}`\n            }, void 0, false, {\n                fileName: \"/Users/uhjee/Desktop/git_remote/TIL/react/book-react/ch_08/02-test-next/pages/page2.js\",\n                lineNumber: 28,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: `data is ${data}`\n            }, void 0, false, {\n                fileName: \"/Users/uhjee/Desktop/git_remote/TIL/react/book-react/ch_08/02-test-next/pages/page2.js\",\n                lineNumber: 29,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: `10 + 20 = ${(0,_src_util__WEBPACK_IMPORTED_MODULE_3__.add)(10, 20)}`\n            }, void 0, false, {\n                fileName: \"/Users/uhjee/Desktop/git_remote/TIL/react/book-react/ch_08/02-test-next/pages/page2.js\",\n                lineNumber: 30,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/uhjee/Desktop/git_remote/TIL/react/book-react/ch_08/02-test-next/pages/page2.js\",\n        lineNumber: 24,\n        columnNumber: 5\n    }, this));\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9wYWdlMi5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFvQztBQUNKO0FBQ0M7QUFFakMsRUFBOEQ7QUFDRUcsS0FBM0QsQ0FBQ0MsZUFBZSxVQUFVLENBQUMsQ0FBQ0MsS0FBSyxFQUFDLENBQUMsR0FBSyxDQUFDO0lBQzVDLEVBQWlCO0lBQ2pCLEtBQUssQ0FBQyxDQUFDLENBQUNDLFFBQVEsRUFBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLHdKQUF3QjtJQUNuREMsT0FBTyxDQUFDQyxHQUFHLENBQUNGLFFBQVE7SUFFcEIsRUFBbUQ7SUFDbkQsS0FBSyxDQUFDRyxJQUFJLEdBQUdKLEtBQUssQ0FBQ0ksSUFBSSxJQUFJLENBQU0sTUFBRSxDQUF3QixFQUEwQjtJQUMzRCxLQUFyQixDQUFDQyxJQUFJLEdBQUcsS0FBSyxDQUFDVixpREFBTyxHQUFJLENBQTBDLEVBQThDO0lBQ3hFLE1BQXhDLENBQUMsQ0FBQztRQUFDUyxJQUFJO1FBQUVDLElBQUk7SUFBQyxDQUFDLENBQUUsQ0FBd0QsRUFBb0M7QUFDakYsQ0FBbkM7QUFFYyxRQUFRLENBQUNQLEtBQUssQ0FBQyxDQUFDLENBQUNNLElBQUksR0FBRUMsSUFBSSxFQUFDLENBQUMsRUFBRSxDQUFDO0lBQzdDLEVBQXVCO0lBQ3ZCLEVBQXNCO0lBQ3RCLEVBQStFO0lBQy9FLEVBQUk7SUFFSixNQUFNLDZFQUNIQyxDQUFHOzt3RkFHREMsQ0FBQzswQkFBQyxDQUFrQjs7Ozs7O3dGQUNwQkEsQ0FBQzsyQkFBRyxNQUFNLEVBQUVILElBQUk7Ozs7Ozt3RkFDaEJHLENBQUM7MkJBQUcsUUFBUSxFQUFFRixJQUFJOzs7Ozs7d0ZBQ2xCRSxDQUFDOzJCQUFHLFVBQVUsRUFBRVYsOENBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRTs7Ozs7Ozs7Ozs7O0FBR2pDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8wMi10ZXN0LW5leHQvLi9wYWdlcy9wYWdlMi5qcz85ZTU3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNhbGxBcGkgfSBmcm9tICcuLi9zcmMvYXBpJztcbmltcG9ydCBSb3V0ZXIgZnJvbSAnbmV4dC9yb3V0ZXInO1xuaW1wb3J0IHsgYWRkIH0gZnJvbSAnLi4vc3JjL3V0aWwnO1xuXG4vLyBnZXRJbml0aWFsUHJvcHMg7ZWo7IiYIOygleydmCAtIOunpOqwnOuzgOyImOuhnCDri6TslpHtlZwg7KCV67O06rCAIOyghOuLrOuQmOyngOunjCDsl6zquLDshKAg7L+866asIO2MjOudvOuvuO2EsOunjCDsgqzsmqlcblBhZ2UyLmdldEluaXRpYWxQcm9wcyA9IGFzeW5jICh7IHF1ZXJ5IH0pID0+IHtcbiAgLy8gZHluYW1pYyBpbXBvcnRcbiAgY29uc3QgeyBzYXlIZWxsbyB9ID0gYXdhaXQgaW1wb3J0KCcuLi9zcmMvc2F5SGVsbG8nKTtcbiAgY29uc29sZS5sb2coc2F5SGVsbG8oKSk7XG5cbiAgLy8gdGhyb3cgbmV3IEVycm9yKCdleGNlcHRpb24gaW4gZ2V0SW5pdGlhbFByb3BzJyk7XG4gIGNvbnN0IHRleHQgPSBxdWVyeS50ZXh0IHx8ICdub25lJzsgLy8g7L+866asIO2MjOudvOuvuO2EsOuhnOu2gO2EsCB0ZXh0IOuzgOyImCDsg53shLFcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGNhbGxBcGkoKTsgLy8g642w7J207YSw66W8IOqwgOyguOyYpOq4sCDsnITtlbQgQVBJIO2YuOy2nCAtICjshJzrsoQgfCDtgbTrnbzsnbTslrjtirgp7JeQ7IScIO2YuOy2nFxuICByZXR1cm4geyB0ZXh0LCBkYXRhIH07IC8vIGdldEluaXRpYWxQcm9wcyDtlajsiJjsnZggIHJldHVybiDqsJLsnYAg7Y6Y7J207KeAIOy7tO2PrOuEjO2KuOydmCBwcm9wcyDqsJLsnLzroZwg7KCE64usXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQYWdlMih7IHRleHQsIGRhdGEgfSkge1xuICAvLyBmdW5jdGlvbiBvbkNsaWNrKCkge1xuICAvLyAgIC8vIER5bmFtaWMgSW1wb3J0XG4gIC8vICAgaW1wb3J0KCcuLi9zcmMvc2F5SGVsbG8nKS50aGVuKCh7IHNheUhlbGxvIH0pID0+IGNvbnNvbGUubG9nKHNheUhlbGxvKCkpKTtcbiAgLy8gfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIHsvKiA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IFJvdXRlci5wdXNoKCcvcGFnZTEnKX0+cGFnZTHroZwg7J2064+ZPC9idXR0b24+ICovfVxuICAgICAgey8qIDxidXR0b24gb25DbGljaz17b25DbGlja30+c2F5SGVsbG8oZHluYW1pYyBpbXBvcnQpPC9idXR0b24+ICovfVxuICAgICAgPHA+dGhpcyBpcyBob21lIHBhZ2UyPC9wPlxuICAgICAgPHA+e2B0ZXh0OiAke3RleHR9YH08L3A+XG4gICAgICA8cD57YGRhdGEgaXMgJHtkYXRhfWB9PC9wPlxuICAgICAgPHA+e2AxMCArIDIwID0gJHthZGQoMTAsIDIwKX1gfTwvcD5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJjYWxsQXBpIiwiUm91dGVyIiwiYWRkIiwiUGFnZTIiLCJnZXRJbml0aWFsUHJvcHMiLCJxdWVyeSIsInNheUhlbGxvIiwiY29uc29sZSIsImxvZyIsInRleHQiLCJkYXRhIiwiZGl2IiwicCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/page2.js\n");

/***/ }),

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"callApi\": () => (/* binding */ callApi)\n/* harmony export */ });\nfunction callApi() {\n    return Promise.resolve(123);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBpLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBTyxTQUFTQSxPQUFPLEdBQUcsQ0FBQztJQUN6QixNQUFNLENBQUNDLE9BQU8sQ0FBQ0MsT0FBTyxDQUFDLEdBQUc7QUFDNUIsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLzAyLXRlc3QtbmV4dC8uL3NyYy9hcGkuanM/ZGNhZiJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gY2FsbEFwaSgpIHtcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgxMjMpO1xufVxuIl0sIm5hbWVzIjpbImNhbGxBcGkiLCJQcm9taXNlIiwicmVzb2x2ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/api.js\n");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"add\": () => (/* binding */ add)\n/* harmony export */ });\nfunction add(a, b) {\n    console.log('called_add');\n    return a + b;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdXRpbC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQU8sU0FBU0EsR0FBRyxDQUFDQyxDQUFDLEVBQUVDLENBQUMsRUFBRSxDQUFDO0lBQ3pCQyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxDQUFZO0lBQ3hCLE1BQU0sQ0FBQ0gsQ0FBQyxHQUFHQyxDQUFDO0FBQ2QsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLzAyLXRlc3QtbmV4dC8uL3NyYy91dGlsLmpzPzhkZmIiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGFkZChhLCBiKSB7XG4gIGNvbnNvbGUubG9nKCdjYWxsZWRfYWRkJyk7XG4gIHJldHVybiBhICsgYjtcbn1cbiJdLCJuYW1lcyI6WyJhZGQiLCJhIiwiYiIsImNvbnNvbGUiLCJsb2ciXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/util.js\n");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/page2.js"));
module.exports = __webpack_exports__;

})();