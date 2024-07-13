import { Model, Optional, DataTypes, Sequelize } from 'sequelize';

interface OtpAttributes {
    id: number;
    email: string;
    otp_hash: string;
    generated_at: number;
  };


interface OtpCreationAttributes extends Optional<OtpAttributes, 'id'> {}

export class Otp extends Model<OtpAttributes, OtpCreationAttributes> {
  declare id: number;
  declare email: string;
  declare otp_hash: string;
  declare generated_at: number;

}

export function initOtp(sequelize: Sequelize) {
  
      Otp.init(
        {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            //unique: true,
          },
          otp_hash: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          generated_at: {
            type: DataTypes.BIGINT,
            allowNull: false, // Optional timestamp
          },
        
        }, 
        {
          sequelize,
          tableName: 'otps'
        }
      ).sync({ alter: true });
      
    }
    
  