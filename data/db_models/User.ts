import { Model, Optional, DataTypes, Sequelize } from 'sequelize';

interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  total_water_footprint: number;
  leaderboard_rank: number;
};

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: string;
  declare name: string;
  declare email: string;
  declare password_hash: string;
  declare total_water_footprint: number;
  declare leaderboard_rank: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;


}

export function initUser(sequelize: Sequelize) {

  User.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      total_water_footprint: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      leaderboard_rank: {
        type: DataTypes.INTEGER,
        allowNull: true
      }

    },
    {
      sequelize: sequelize,
      tableName: 'users',
      timestamps: true

    }
  ).sync({
    alter: true
  });

}

