import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { configCors } from './config/cors.config';
import bodyParser from 'body-parser';
import passport from 'passport';
import { strategyValidation } from './config/jwt.config';
import { connectToDatabase } from './modules/prisma/prisma.service';
import router from './routes/router';

const app = express();

app.use(cors(configCors));
app.use(morgan('dev'));
app.use(bodyParser.json());
passport.use(strategyValidation);

(async () => {
  try {
    await connectToDatabase();
    app.use('/', router);
    app.get('/health', (_req, res) => {
      res.status(200).json('is Healthy');
    });
    const PORT = 3000;
    app.listen(PORT, () => console.log(`Fake API listening at ${PORT}`));
  } catch (error) {
    console.log(error);
  }
})();
