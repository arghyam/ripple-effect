import express from 'express';
import winston from 'winston';
import authRouter from './routes/auth/AuthRoutes';
import waterFtCalcRouter from './routes/water_ft_catculator/WaterfootprintCalcRoutes';
import { initUser, User } from './data/db_models/User';
import sequelize from './db';
import { initOtp } from './data/db_models/Otp';
import path from 'path';

import { initWaterFtCalcResult, WaterFtCalcResult } from './data/db_models/WaterFtCalcResult';
import { IngredientGroupPatternItem, initIngredientGroupPatternItem } from './data/db_models/IngredientGroupPatternItem';
import { initIngredient } from './data/db_models/Ingredient';
import { IngredientGroupPattern, initIngredientGroupPattern } from './data/db_models/IngredientGroupPattern';



initUser(sequelize)
initOtp(sequelize)

initIngredientGroupPattern(sequelize)
initIngredientGroupPatternItem(sequelize)
initIngredient(sequelize)
initWaterFtCalcResult(sequelize)

IngredientGroupPattern.hasMany(IngredientGroupPatternItem, { foreignKey: 'patternId' });
IngredientGroupPatternItem.belongsTo(IngredientGroupPatternItem, { foreignKey: 'patternId' });

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

app.use(express.json())

app.use('/images', express.static(path.join('./resources','public')))


app.use('/api/auth', authRouter)

app.use('/api/user', waterFtCalcRouter)


app.get('/', (req, res) => {
  logger.info('Received a GET request to the root path')
  res.send('Welcome to my server!')
})


app.listen(Number(process.env.SERVER_PORT), () => {
  logger.info(`Puddle Server is running on port ${process.env.SERVER_PORT}`)
})