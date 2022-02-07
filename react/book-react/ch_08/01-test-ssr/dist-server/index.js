"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _App = _interopRequireDefault(require("./App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ReactDom.render(<App page="home" />, document.getElementById('root'));
// server로부터 전달된 초기 데이터
const initialData = window.__INITIAL_DATA__; // SSR은 DOM 요소는 미리 서버가 만든 상태이기 때문에, 이벤트만 다시 걸어주는 hydrate 함수 사용

_reactDom.default.hydrate( /*#__PURE__*/_react.default.createElement(_App.default, {
  page: initialData.page
}), document.getElementById('root'));