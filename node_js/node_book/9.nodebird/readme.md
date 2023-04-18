# 9. sns service 만들기

## 9-1. setting

- install sequelize
  ```shell
  $ npm i sequelize mysql2 sequelize-cli
  $ npx sequelize init
  ```
  - config, migrations, models, seeders 디렉토리 생성됨

- install others packages
  ```shell
    $ npm i express cookie-parser express-session morgan multer dotenv nunjucks
    $ npm i -D nodemon    
  ```
  - multer: file upload middleware
  - morgan: log management middleware
  - nunjucks: template engine
  - nodemon: hot reload


## 9-2. connect database

- config/config.json
  - db 접속 정보 입력 및 데이터베이스 이름 명시
- database 생성 스크립트 실행
  ```shell
    $ npx sequelize db:create
  ```

## 9-3. 로그인 - passport 모듈
- 세션, 쿠키 등 처리를 위해 passport package 사용
  ```shell
    $ npm i passport passport-local passport-kakao bcrypt
  ```

### 로그인 요청 흐름
1. 라우터를 통해 로그인 요청 들어옴
2. 라우터에서 `passport.authenticate` 메소드 호출
3. 로그인 전략 수행
4. 로그인 성공 시, 사용자 정보 객체와 함께 req.login 호출
5. req.login 메소드가 passport.serializeUser 호출
6. req.session에 사용자 id 저장
7. 로그인 완료

### 인증이 필요한 요청 흐름
1. 요청 들어옴
2. 라우터에 요청이 도달하기 전에 `passport.session` 미드웨어가 `passport.deserializeUser` 메소드 호출
3. `req.session`에 저장된 id로 DB에서 사용자 조회
4. 조회된 사용자 정보를 `req.user`에 저장
5. 라우터에서 `req.user` 객체 사용 가능

### 로그인 전략
passport는 로그인 시 인증을 수행할 동작을 전략 *strategy* 용어 사용

1. 로컬 로그인: `passport-local` 모듈 사용
