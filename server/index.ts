import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter/userRouter';
import exercisesRouter from './routes/exercisesRouter';
import loginRouter from './routes/loginRouter';
import config from './config/config';
import { parseString } from './utils/parsers';
import { tokenExtractor } from './mdw/extractToken';
import { logger } from './mdw/logger';
import { errorhnd } from './mdw/errorhnd';

const mongodb = parseString(config.MONGODB_URI);

mongoose
  .connect(mongodb, <mongoose.ConnectOptions>{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch((e) => {
    console.log(`can't connect to mongodb: ${e.message}`);
  });

const app = express();
const PORT = config.PORT || 3001;

app.use(tokenExtractor);
app.use(cors());
app.use(express.json());
app.use(logger);

app.use('/login', loginRouter);

app.use('/exercises', exercisesRouter);
app.use('/users', userRouter);
app.use(errorhnd);

app.listen(PORT, () => {
  console.log(`running on ${PORT}`);
});
