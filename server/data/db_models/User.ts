import { Model, Optional, DataTypes, Sequelize } from 'sequelize';

interface UserAttributes {
  id: string
  name: string
  email: string
  phone_number: string | undefined
  photo_url: string | undefined
  password_hash: string
  total_water_footprint: number
};

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: string
  declare name: string
  declare email: string
  declare phone_number: string | undefined
  declare photo_url: string | undefined
  declare password_hash: string
  declare total_water_footprint: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
    


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
      phone_number: {
        type: DataTypes.STRING,
        allowNull: true
      },
      photo_url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      total_water_footprint: {
        type: DataTypes.INTEGER,
        allowNull: true,
      }

    },
    {
      sequelize: sequelize,
      tableName: 'ripple_users',
      timestamps: true

    }
  ).sync({
    alter: true
  });

}

