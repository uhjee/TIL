const express = require('express');
var cors = require('cors');
const morgan = require('morgan');
const router = express.Router();

const app = express();

app.set('port', process.env.PORT || 3002);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

router.get('/test', async (req, res, next) => {
  try {
    res.json({
      token: '토큰인 것',
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: e,
    });
  }
});

router.post('/test', async (req, res, next) => {
  try {
    console.log({ body: req.body });

    res.json({
      mgrId: 'admin',
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: e,
    });
  }
});

app.use(router);
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
