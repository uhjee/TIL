import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import dataRoutes from './routes/dataRoutes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({}));
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

app.use('/api/datas', dataRoutes);

app.use((req, res, next) => {
  res.status(404).send({ message: 'Not Found' });
});

// app.use((err, req, res, next) => {
//     res.status(500).send({ message: err.message });
//   });

export default app;
