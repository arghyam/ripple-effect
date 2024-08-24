import { DataTypes, Model, Optional, Sequelize } from "sequelize";



interface IngredientAttributes {
    id: number
    name: string
    unit: string
    water_footprint: number
    sampleImageUrl: string
    
}

interface IngredientCreationAttributes extends Optional<IngredientAttributes, 'id'> {}

export class Ingredient extends Model<IngredientAttributes, IngredientCreationAttributes> {
    declare id: number;
    declare name: string;
    declare unit: string;
    declare water_footprint: number;
    declare sampleImageUrl: string;
    
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  
  }
  
  export function initIngredient(sequelize: Sequelize) {
    
    Ingredient.init(
        {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
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
          sampleImageUrl: {
            type: DataTypes.STRING,
            allowNull: false
          }
          
        },
        {
          sequelize: sequelize,
          tableName: 'ingredients',
          timestamps: true
        }
      ).sync({ alter: true })

      
}
  