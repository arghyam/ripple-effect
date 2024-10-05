import { DataTypes, Model, Optional, Sequelize } from "sequelize";



interface IngredientAttributes {
    id: string
    name: string
    unit: string
    water_footprint: number
    last_updated: Date
    
}

interface IngredientCreationAttributes extends Optional<IngredientAttributes, 'id'> {}

export class Ingredient extends Model<IngredientAttributes, IngredientCreationAttributes> {
    declare id: string
    declare name: string
    declare unit: string
    declare water_footprint: number
    declare last_updated: Date
  
  }
  
  export function initIngredient(sequelize: Sequelize) {
    
    Ingredient.init(
        {
          id: {
            type: DataTypes.STRING,
            unique: true,
            primaryKey: true,
          },
          
          name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          unit: {
            type: DataTypes.STRING,
            allowNull: false
          },
          water_footprint: {
            type: DataTypes.DECIMAL,
            allowNull: false
          },
          last_updated: {
            type: DataTypes.DATE,
            allowNull: false
          }

          
        },
        {
          sequelize: sequelize,
          tableName: 'ripple_ingredients',
          timestamps: false
        }
      ).sync({ alter: true })

      
}
  