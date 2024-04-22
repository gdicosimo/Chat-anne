import express from 'express';
import cors from 'cors';

import { router as usersRouter } from './routes/users.model.js';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.status(400).send('api works!!')
})

export default app;