import { Optional, Model, DataTypes, Sequelize } from "sequelize";


interface IngredientGroupPatternAttributes {
  id: number
  rank: number
  size: number
  
}

interface IngredientGroupPatternCreationAttributes extends Optional<IngredientGroupPatternAttributes, 'id'> { }

export class IngredientGroupPattern extends Model<IngredientGroupPatternAttributes, IngredientGroupPatternCreationAttributes> {
  declare id: number
  declare rank: number
  declare size: number

}

export function initIngredientGroupPattern(sequelize: Sequelize) {

  IngredientGroupPattern.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      rank: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
      
    },
    {
      sequelize: sequelize,
      tableName: 'ingredient_group_patterns',
      timestamps: true
    }
  ).sync({ alter: true })
}
