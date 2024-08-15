import express from 'express';
import winston from 'winston';
import authRouter from './routes/auth/AuthRoutes';
import waterFtCalcRouter from './routes/water_ft_catculator/WaterfootprintCalcRoutes';
import { initUser, User } from './data/db_models/User';
import sequelize from './db';
import { initOtp } from './data/db_models/Otp';
import path from 'path';
import { IngredientRow, initIngredientRow } from './data/db_models/IngredientRowData';
import { IngredientRowItem, initIngredientRowItem } from './data/db_models/IngredientRowItem';
import { initWaterFtCalcResult, WaterFtCalcResult } from './data/db_models/WaterFtCalcResult';


initUser(sequelize)
initOtp(sequelize)
initIngredientRow(sequelize)
initIngredientRowItem(sequelize)
initWaterFtCalcResult(sequelize)

IngredientRow.hasMany(IngredientRowItem, { foreignKey: 'rowId' });
IngredientRowItem.belongsTo(IngredientRow, { foreignKey: 'rowId' });

User.hasMany(WaterFtCalcResult, { foreignKey: 'user_id' })
WaterFtCalcResult.belongsTo(User, { foreignKey: 'user_id' })


export const logger = winston.createLogger({
  level: 'info', // Set the minimum log level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console() // Log to console
  ]
})

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

const app = express()


// Body parser middleware (already included in Express.js)
app.use(express.json())

app.use('/images', express.static(path.join(__dirname, 'resources','public')))


app.use('/api/auth', authRouter)

app.use('/api/user/', waterFtCalcRouter)


app.get('/', (req, res) => {
  logger.info('Received a GET request to the root path')
  res.send('Welcome to my server!')
})


app.listen(() => {
  logger.info(`Server is running on port`)
})