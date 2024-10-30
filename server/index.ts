import express from 'express';
import winston from 'winston';
import authRouter from './routes/auth/AuthRoutes';
import testRouter from './routes/TestRoute';
import profileRouter from './routes/profile/ProfileRoutes'
import leaderboardRouter from './routes/leaderboard/LeaderboardRoutes'
import waterFtCalcRouter from './routes/water_ft_catculator/WaterfootprintCalcRoutes';
import { initUser, User } from './data/db_models/User';
import sequelize from './db';
import { initOtp } from './data/db_models/Otp';
import path from 'path';
import { initWaterFtCalcResult, WaterFtCalcResult } from './data/db_models/WaterFtCalcResult';
import { initIngredient } from './data/db_models/Ingredient';
import { initRecipe } from './data/db_models/Recipe';
import errorHandler from './utils/middleware/errorHandler';
import cors from 'cors';



initUser(sequelize)
initOtp(sequelize)

initIngredient(sequelize)
initRecipe(sequelize)

initWaterFtCalcResult(sequelize)


User.hasMany(WaterFtCalcResult, { foreignKey: 'user_id' })
WaterFtCalcResult.belongsTo(User, { foreignKey: 'user_id' })


export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console()
  ]
})


const app = express()
const corsOptions = {
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json())

app.use(errorHandler)


app.use('/images', express.static(path.join('./resources','public')))

app.use('/profile-photo', express.static(path.join('./uploads')))


app.use('/api/auth', authRouter)

app.use('/api/user', waterFtCalcRouter)

app.use('/api/profile', profileRouter)

app.use('/api/leaderboard', leaderboardRouter)

app.use('/test', testRouter)


app.get('/', (_, res) => {
  logger.info('Received a GET request to the root path')
  res.send('Welcome to Puddle server!')
})


app.listen(Number(process.env.SERVER_PORT), () => {
  logger.info(`Puddle Server is running on port ${process.env.SERVER_PORT}`)
})
