# #7. Sequelize

- 시퀄라이즈는 ORM(Object-relational Mapping)
- 자바스크립트 객체와 DB의 relation을 mapping해주는 도구
- SQL 언어를 직접 사용하지 않아도 자바스크립트만으로 database 조작 가능

## ## 01. 환경구축 및 세팅

```shell
 $ npm i express morgan nunjucks sequelize sequelize-cli mysql2   
 $ npm i -D nodemon
```

- `sequelize-cli`: 명령어를 실행하기 위한 패키지
- `mysql2`: 드라이버
- `nunjucks`: 모질라 재단에서 만든 template / 가독성 안좋음

```shell
npx sequelize init
```



// models/index.js

```js
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

// 인스턴스 생성
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

module.exports = db;

```



## ## 02. 모델 정의하기

// models/user.js

```js
const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    // init: 테이블에 대한 설정
    static init(sequelize) {
        return super.init({
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
            age: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            married: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            comment: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false, // softDelete
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }

    // associate: 다른 모델과의 관계 설정
    static associate(db) {
        // 일대다: hasMany
        db.User.hasMany(db.Comment, {foreignKey: 'commenter', sourceKey: 'id'});
    }
}
```

// models/comment.js

```js
const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            comment: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW
            },
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Comment',
            tableName: 'comments',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        })
    }

    static associate(db) {
        // 다대일: belongsTo
        db.Comment.belongsTo(db.User, {foreignKey: 'commenter', targetKey: 'id'});
    }
}
```





## ## 03. router에서 사용

app.js

```js
// router
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);
```



### 조회 Select

// 조회

```js
router.route('/').get(async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (e) {
        console.error(e)
        next(e)
    }
})
```



// join 조회 (user- comment)

```js
router.get('/:id/comments', async (req, res, next) => {
    try {
        const comments = await Comment.findAll({
            include: {
                model: User,
                where: {id: req.params.id}
            }
        })
        console.log(comments)
        res.json(comments);
    } catch (e) {
        console.error(e)
        next(e)
    }
})
```



### 생성 Create

```js
router.post(async (req, res, next) => {
    try {
        const user = await User.create({
            name: req.body.name,
            age: req.body.age,
            married: req.body.married,
        })
        console.log(user);
        res.status(201).json(user);
    } catch (e) {
        console.error(e);
        next(e)
    }
})
```



### 수정 Update

```js
router.route('/:id')
    .patch(async (req, res, next) => {
        try {
            const result = await Comment.update({
                comment: req.body.comment
            }, {
                where: {id: req.params.id}
            })
            res.json(result);
        } catch (e) {
            console.error(e);
            next(e)
        }
    })
  
```



### 삭제 Delete

```js
router.delete(async (req, res, next) => {
        try {
            const result = await Comment.destroy({where: {id: req.params.id}});
            res.json(result);
        } catch (e) {
            console.error(e);
            next(e)
        }
    })
```





