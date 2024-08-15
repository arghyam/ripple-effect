import { Sequelize } from 'sequelize';

const connectionString = process.env.DATABASE_URL as string

const sequelize = new Sequelize(connectionString);

export default sequelize;