# middleware

미들웨어는 익스프레스의 핵심입니다.
요청과 응답의 중간(middle)에 위치하여 미들웨어라고 부릅니다.
라우터와 에러 핸들러 또한 미들웨어의 일종이므로 미들웨어는 익스프레스의 핵심

spring의 filter와 AOP 구현체와 유사한 역할을 하는 것으로 보입니다.

미들웨어는 `app.use`와 함께 사용됩니다.

## 자주 쓰이는 middleware lib

### 📦 morgan

요청과 응답에 대한 정보를 콘솔에 기록합니다.

- 개발환경: dev
  - [http 메소드] [주소] [http 상태 코드] [응답 속도] - [응답 바이트]
- 배포환경: combined

```javascript
app.use(morgan('dev'));
```

### 📦 static

static 미들웨어는 정적인 파일(css, js, image 파일 등)들을 제공하는 라우터 역할을 합니다.

WEB Server가 static 파일들을 관리하던 개념과 유사한 것 같습니다.

```js
app.use('/', express.static(path.join(__dirname, 'public')));
```

함수의 인수로 정적 파일들이 담겨 있는 폴더를 지정합니다.

요청 경로에 해당하는 파일이 없으면 알아서 내부적으로 `next()`를 호출해 다음 미들웨어를 실행합니다.
만약 파일을 발견했다면 응답으로 해당 파일을 보내고, 다음 미들웨어는 실행되지 않습니다.

### 📦 body-parser

reqest의 body의 데이터를 파싱해서 req.body 객체로 만들어주는 미들웨어입니다.
보통 form-data나 AJAX 요청의 데이터를 처리합니다.

express는 4.16.0 버전부터 내장으로 제공합니다.

```js
app.use(express.json());
```

### 📦 cookie-parser

request에 동봉된 cookie를 해석해 `req.cookies` 객체로 만듭니다. 유효기간이 지난 쿠키는 알아서 걸러냅니다.

예를 들면 name=anne 라는 쿠키를 보냈다면, `req.cookies`는 `{name: 'anne'}`가 됩니다.

첫 번째 인수로 비밀 키를 넣어줄 수 있습니다. 서명된 쿠키가 있는 경우에는 제공한 비밀 키를 통해 해당 쿠키가 내 서버에서 만든 쿠키임을 증명할 수 있습니다.

### 📌 미들웨어의 활용

아래와 같이 미들웨어 함수를 한 번 wrapping 해 기존 기능을 확장해서 사용할 수 있습니다.

```js
app.use((req, res, next) => {
  // 함수로 한 번 warpping => 기존 미들웨어의 확장
  if (process.env.NODE_env === 'production') {
    morgran('combined')(req, res, next);
  } else {
    morgran('dev')(req, res, next);
  }
});
```

### 📦 multer

이미지, 동영상 등을 비롯한 여러 파일들을 멀티 파트 형식으로 업로드할 때 사용하는 미들웨어입니다.

멀티파트 형식이란 다음과 같이 enctype 이 `multipart/form-data`인 폼을 통해 업로드하는 데이터의 형식을 의미합니다.
