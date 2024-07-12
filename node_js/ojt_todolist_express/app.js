const express = require('express');
var cors = require('cors');
const morgan = require('morgan');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { swagger_options } = require('./swagger-options');

const { sequelize } = require('./models');

const todosRouter = require('./routes/todos');

const app = express();

app.set('port', process.env.PORT || 3002);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Database 연결 성공');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/todos', todosRouter);

const swaggerSpecs = swaggerJsdoc(swagger_options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
