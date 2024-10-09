import { Model, Optional, DataTypes, Sequelize } from 'sequelize';
import { User } from './User';

interface WaterFtCalcResultAttributes {
  id: string
  user_id: string
  water_footprint: number
  generated_at: Date

};

interface WaterFtCalcResultCreationAttributes extends Optional<WaterFtCalcResultAttributes, 'id'> { }

export class WaterFtCalcResult extends Model<WaterFtCalcResultAttributes, WaterFtCalcResultCreationAttributes> {
  declare id: number
  declare user_id: string
  declare water_footprint: number
  declare generated_at: Date

}

export function initWaterFtCalcResult(sequelize: Sequelize) {

    WaterFtCalcResult.init(
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true
        },
        user_id: {
          type: DataTypes.STRING,
          allowNull: false,
          references: {
            model: User,
            key: 'id'
          },
        },
        water_footprint: {
          type: DataTypes.DECIMAL,
          allowNull: false
        },
        generated_at: {
          type: DataTypes.DATE,
          allowNull: false
        }
  
      },
      {
        sequelize: sequelize,
        tableName: 'ripple_water_ft_calc_results',
        timestamps: false
  
      }
    ).sync({
      alter: true
    })
  
  }
  
  