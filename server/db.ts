import { Dialect, Sequelize } from "sequelize"
import * as dotenv from 'dotenv-flow'
dotenv.config({ path: './' })


const sequelize = new Sequelize(String(process.env.DB_NAME), String(process.env.DB_USERNAME), String(process.env.DB_PASSWORD),{
        host: String(process.env.DB_HOST),
        port: Number(process.env.DB_PORT),
        dialect: "postgres",
        ssl: true,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // For development only, disable for production
              }
        }
    }
)

export default sequelize