# 8. mongoDB

대표적인 NoSQL

### SQL vs mongoDB

|SQL|mongoDB(NoSQL)|
|---|----|
|규칙에 맞는 데이터 입력 | 자유로운 데이터 입력|
|테이블 간 relation 지원 | 컬렉션 간 relation 미지원|
|안정성, 일관성 | 확장성, 가용성|
|테이블 / 로우 / 컬럼| 컬렉션 / 다큐먼트 / 필드|

## ## 환경 세팅

- 계정 생성
    - 관리자 계정 추가
      ```shell
      use admin
      ```
    - 계정 생성
      ```shell
      db.createUser({user: 'name', pwd: 'password', roles: ['root']})
      ```

- db 생성
  ```shell
    use nodejs
    ```

- collection 생성
    ```shell
    db.createCollection('users')
    ```

## ## CRUD methods

### Create

- insertOne
    ```js
      db.[collection].insertOne({name: 'zee', age: 23, married: false, comment: '안녕하세요 반가워요', createdAt: new Date()});
    ```
- 다른 데이터의 ObjectId 사용해서 insert
    ```js
    db.comments.insertOne({commenter: ObjectId("63b58fddc5437d14ae22f43b"), comment: '안녕하세요 댓글이에요', createdAt: new Date()})
   ```

### Read

- 컬렉션의 모든 도큐먼트 조회
    ```js
        db.users.find({})
    ```

- 특정 필드만 조회
    - `1` 또는 `true`로 표현해야 가져옴
      ```js
        db.users.find({}, {_id: 0, name: 1, married:1})
      ```

- 조회 조건
  ```js
  db.users.find({age: {$gt: 30}, married: true})
  ```
  주로 쓰이는 연산자
    - $gt
    - $gte
    - $lt
    - $lte
    - $ne : 같지 않음
    - $or
    - $in : 배열 요소 중 하나

- 정렬
  ```js
  db.users.find({}, {}).sort({age: -1})
  ```

    - `-1` : DESC
    - `1` : ASC

- 개수 제한 및 건너뛰기 (paging)
  ```js
    db.users.find().limit(1).skip(1)
  ```
