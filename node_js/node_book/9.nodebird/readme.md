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
