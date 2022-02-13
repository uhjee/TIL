"use strict";
(() => {
var exports = {};
exports.id = 730;
exports.ids = [730];
exports.modules = {

/***/ 408:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Page2)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./src/api.js
function callApi() {
    return Promise.resolve(123);
}

;// CONCATENATED MODULE: external "next/router"
const router_namespaceObject = require("next/router");
;// CONCATENATED MODULE: ./pages/page2.js



// getInitialProps 함수 정의 - 매개변수로 다양한 정보가 전달되지만 여기선 쿼리 파라미터만 사용
Page2.getInitialProps = async ({ query  })=>{
    // dynamic import
    const { sayHello  } = await __webpack_require__.e(/* import() */ 948).then(__webpack_require__.bind(__webpack_require__, 948));
    console.log(sayHello());
    // throw new Error('exception in getInitialProps');
    const text = query.text || 'none'; // 쿼리 파라미터로부터 text 변수 생성
    const data = await callApi(); // 데이터를 가져오기 위해 API 호출 - (서버 | 클라이언트)에서 호출
    return {
        text,
        data
    }; // getInitialProps 함수의  return 값은 페이지 컴포넌트의 props 값으로 전달
};
function Page2({ text , data  }) {
    // function onClick() {
    //   // Dynamic Import
    //   import('../src/sayHello').then(({ sayHello }) => console.log(sayHello()));
    // }
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                children: "this is home page2"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                children: `text: ${text}`
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                children: `data is ${data}`
            })
        ]
    }));
};


/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(408));
module.exports = __webpack_exports__;

})();