import express from 'express';
import winston from 'winston';
import authRouter from './routes/auth/AuthRoutes';
import { initUser } from './domain/models/User';
import sequelize from './db';
import { initOtp } from './domain/models/Otp';
import dotenv from 'dotenv';


dotenv.config();
//const cors = require('cors'); // Enable if needed for CORS



initUser(sequelize);
initOtp(sequelize);

const jwtSecret = process.env.JWT_SECRET;
const databaseUrl = process.env.DATABASE_URL;

console.log(`JWT_SECRET: ${jwtSecret}`);
console.log(`DATABASE_URL: ${databaseUrl}`);


export const logger = winston.createLogger({
  level: 'info', // Set the minimum log level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console() // Log to console
  ]
});

const app = express();
const port = 3000;


// Body parser middleware (already included in Express.js)
app.use(express.json());


app.use('/api/auth', authRouter);




app.get('/', (req, res) => {
  logger.info('Received a GET request to the root path');
  res.send('Welcome to my server!');
});


app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});