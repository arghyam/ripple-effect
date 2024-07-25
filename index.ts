import express from 'express';
import winston from 'winston';
import authRouter from './routes/auth/AuthRoutes';
import { initUser } from './data/db_models/User';
import sequelize from './db';
import { initOtp } from './data/db_models/Otp';
import dotenv from 'dotenv';


dotenv.config();



initUser(sequelize);
initOtp(sequelize);



export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: 'server_logs'
    })
  ]
});

const app = express();
const port = 3000;


app.use(express.json());


app.use('/api/auth', authRouter);





app.get('/', (_req, res) => {
  res.send('Welcome to Puddle server!');
});


app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});