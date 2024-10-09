import { Model, Optional, DataTypes, Sequelize } from 'sequelize';

interface OtpAttributes {
  id: string;
  email: string;
  otp_hash: string;
  generated_at: number;
};


interface OtpCreationAttributes extends Optional<OtpAttributes, 'id'> { }

export class Otp extends Model<OtpAttributes, OtpCreationAttributes> {
  declare id: string;
  declare email: string;
  declare otp_hash: string;
  declare generated_at: number;

}

export function initOtp(sequelize: Sequelize) {

  Otp.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      otp_hash: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      generated_at: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

    },
    {
      sequelize,
      tableName: 'ripple_otps'
    }
  ).sync({ alter: true });

}

