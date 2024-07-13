import { Model, Optional, DataTypes, Sequelize } from 'sequelize';

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  // other attributes...
};

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password_hash: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  // other attributes...

}

export function initUser(sequelize: Sequelize) {
  
console.log("User models were synchronized successfully.");
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
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
    
    }, 
    {
      sequelize: sequelize,
      tableName: 'users2',
      timestamps: true

    }
  ).sync({ 
    alter: true 
  });
  
}

