import express from 'express';
import winston from 'winston';
import authRouter from './routes/auth/AuthRoutes';
import waterFtCalcRouter from './routes/water_ft_catculator/WaterfootprintCalcRoutes';
import { initUser } from './data/db_models/User';
import sequelize from './db';
import { initOtp } from './data/db_models/Otp';
import * as dotenv from 'dotenv';
import path from 'path';
import { IngredientRow, initIngredientRow } from './data/db_models/IngredientRowData';
import { IngredientRowItem, initIngredientRowItem } from './data/db_models/IngredientRowItem';
dotenv.config()




initUser(sequelize)
initOtp(sequelize)
initIngredientRow(sequelize)
initIngredientRowItem(sequelize)

IngredientRow.hasMany(IngredientRowItem, { foreignKey: 'rowId' });
IngredientRowItem.belongsTo(IngredientRow, { foreignKey: 'rowId' });


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

const app = express()
const port = 3000


// Body parser middleware (already included in Express.js)
app.use(express.json())

app.use('/images', express.static(path.join(__dirname, 'resources','public')))


app.use('/api/auth', authRouter)

app.use('/api/user/', waterFtCalcRouter)


app.get('/', (req, res) => {
  logger.info('Received a GET request to the root path')
  res.send('Welcome to my server!')
})


app.listen(port, () => {
  logger.info(`Server is running on port ${port}`)
})