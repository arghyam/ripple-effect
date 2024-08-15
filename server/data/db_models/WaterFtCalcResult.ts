import { Model, Optional, DataTypes, Sequelize } from 'sequelize';
import { User } from './User';

interface WaterFtCalcResultAttributes {
  id: string;
  user_id: string;
  water_footprint: number;
 
};

interface WaterFtCalcResultCreationAttributes extends Optional<WaterFtCalcResultAttributes, 'id'> { }

export class WaterFtCalcResult extends Model<WaterFtCalcResultAttributes, WaterFtCalcResultCreationAttributes> {
  declare id: number;
  declare user_id: string;
  declare water_footprint: number;

  public readonly createdAt!: Date;


}

export function initWaterFtCalcResult(sequelize: Sequelize) {

    WaterFtCalcResult.init(
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.STRING,
          allowNull: false,
          references: {
            model: User,
            key: 'id',
          },
        },
        water_footprint: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
  
      },
      {
        sequelize: sequelize,
        tableName: 'water_ft_calc_results_2',
        timestamps: true
  
      }
    ).sync({
      alter: true
    });
  
  }
  
  