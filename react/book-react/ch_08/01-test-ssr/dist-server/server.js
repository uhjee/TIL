"use strict";

var _express = _interopRequireDefault(require("express"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var url = _interopRequireWildcard(require("url"));

var _server = require("react-dom/server");

var _react = _interopRequireDefault(require("react"));

var _App = _interopRequireDefault(require("./App"));

var _styledComponents = require("styled-components");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// react-dom 패키지의 server 디렌토리 하위에 서버에서 사용하는 기능
// express 객체인 app 변수를 사용해, 미들웨어와 url 경로 설정
const app = (0, _express.default)(); // webpack 빌드 후 생성되는 index.html 파일의 내용을 가져온다.

const html = _fs.default.readFileSync(_path.default.resolve(__dirname, '../dist/index.html'), 'utf8'); // 정적파일 연결


app.use('/dist', _express.default.static('dist')); // 브라우저가 자동으로 요청하는 favicon.ico 파일이 아래 요청을 타지 않도록

app.get('/favicon.ico', (req, res) => res.sendStatus(204));
app.get('*', (req, res) => {
  const parsedUrl = url.parse(req.url, true); // 문자열 주소값을 구조체로 변환

  const page = parsedUrl.pathname ? parsedUrl.pathname.substring(1) : 'home'; // 'pathname' 앞의 / 를 삭제해 page 변수 만들기

  const sheet = new _styledComponents.ServerStyleSheet(); // style 추출하는데 사용되는 객체 생성

  const renderString = (0, _server.renderToString)(sheet.collectStyles( /*#__PURE__*/_react.default.createElement(_App.default, {
    page: page
  })));
  const styles = sheet.getStyleTags(); // 스타일 정보추출

  const initialData = {
    page
  };
  const result = html.replace('<div id="root"></div>', `<div id="root">${renderString}</div>`).replace('__DATA_FROM_SERVER__', JSON.stringify(initialData)) // 문자열을 초기 데이터로 대체
  .replace('__STYLE_FROM_SERVER__', styles); // 추출된 스타일 코드 HTML 삽입

  res.send(result);
});
app.listen(3000);