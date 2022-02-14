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
exports.id = "pages/_error";
exports.ids = ["pages/_error"];
exports.modules = {

/***/ "./pages/_error.js":
/*!*************************!*\
  !*** ./pages/_error.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ErrorPage)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n\n// 에러 페이지도 getInitialProps 함수 사용 가능\nErrorPage.getInitialProps = ({ res , err  })=>{\n    const statusCode = res ? res.statusCode : err ? err.statusCode : null;\n    return {\n        statusCode\n    };\n};\nfunction ErrorPage({ statusCode  }) {\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            statusCode === 404 && '페이지를 찾을 수 없습니다.',\n            statusCode === 500 && '알 수 없는 에러가 발생했습니다.',\n            !statusCode && '클라이언트에서 에러가 발생했습니다.'\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/uhjee/Desktop/git_remote/TIL/react/book-react/ch_08/02-test-next/pages/_error.js\",\n        lineNumber: 10,\n        columnNumber: 5\n    }, this));\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fZXJyb3IuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBLEVBQW1DO0FBQ1hBLFNBQWYsQ0FBQ0MsZUFBZSxJQUFJLENBQUMsQ0FBQ0MsR0FBRyxHQUFFQyxHQUFHLEVBQUMsQ0FBQyxHQUFLLENBQUM7SUFDN0MsS0FBSyxDQUFDQyxVQUFVLEdBQUdGLEdBQUcsR0FBR0EsR0FBRyxDQUFDRSxVQUFVLEdBQUdELEdBQUcsR0FBR0EsR0FBRyxDQUFDQyxVQUFVLEdBQUcsSUFBSTtJQUNyRSxNQUFNLENBQUMsQ0FBQztRQUFDQSxVQUFVO0lBQUMsQ0FBQztBQUN2QixDQUFDO0FBRWMsUUFBUSxDQUFDSixTQUFTLENBQUMsQ0FBQyxDQUFDSSxVQUFVLEVBQUMsQ0FBQyxFQUFFLENBQUM7SUFDakQsTUFBTSw2RUFDSEMsQ0FBRzs7WUFDREQsVUFBVSxLQUFLLEdBQUcsSUFBSSxDQUFpQjtZQUNqQkEsVUFBWixLQUFLLEdBQUcsSUFBSSxDQUFvQjthQUNmQSxVQUFoQixJQUFJLENBQXFCOzs7Ozs7O0FBRzNDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8wMi10ZXN0LW5leHQvLi9wYWdlcy9fZXJyb3IuanM/MjAxMCJdLCJzb3VyY2VzQ29udGVudCI6WyJcbi8vIOyXkOufrCDtjpjsnbTsp4Drj4QgZ2V0SW5pdGlhbFByb3BzIO2VqOyImCDsgqzsmqkg6rCA64qlXG5FcnJvclBhZ2UuZ2V0SW5pdGlhbFByb3BzID0gKHsgcmVzLCBlcnIgfSkgPT4ge1xuICBjb25zdCBzdGF0dXNDb2RlID0gcmVzID8gcmVzLnN0YXR1c0NvZGUgOiBlcnIgPyBlcnIuc3RhdHVzQ29kZSA6IG51bGw7XG4gIHJldHVybiB7IHN0YXR1c0NvZGUgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEVycm9yUGFnZSh7IHN0YXR1c0NvZGUgfSkge1xuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICB7c3RhdHVzQ29kZSA9PT0gNDA0ICYmICftjpjsnbTsp4Drpbwg7LC+7J2EIOyImCDsl4bsirXri4jri6QuJ31cbiAgICAgIHtzdGF0dXNDb2RlID09PSA1MDAgJiYgJ+yVjCDsiJgg7JeG64qUIOyXkOufrOqwgCDrsJzsg53tlojsirXri4jri6QuJ31cbiAgICAgIHshc3RhdHVzQ29kZSAmJiAn7YG065287J207Ja47Yq47JeQ7IScIOyXkOufrOqwgCDrsJzsg53tlojsirXri4jri6QuJ31cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJFcnJvclBhZ2UiLCJnZXRJbml0aWFsUHJvcHMiLCJyZXMiLCJlcnIiLCJzdGF0dXNDb2RlIiwiZGl2Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_error.js\n");

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
var __webpack_exports__ = (__webpack_exec__("./pages/_error.js"));
module.exports = __webpack_exports__;

})();