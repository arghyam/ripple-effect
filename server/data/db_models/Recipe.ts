import { Optional, Model, Sequelize, DataTypes } from "sequelize";

export interface IngredientData2 {
  id: string;
  name: string;
  unit: string;
  quantity: string;
  
}

interface RecipeAttributes {
  id: string;
  name: string;
  unit: string;
  water_footprint: number;
  ingredients: IngredientData2[];
  thumbnail_url: string;

}

interface RecipeCreationAttributes extends Optional<RecipeAttributes, 'id'> {}

export class Recipe extends Model<RecipeAttributes, RecipeCreationAttributes> {
  declare id: string;
  declare name: string;
  declare unit: string;
  declare water_footprint: number;
  declare ingredients: IngredientData2[];
  declare thumbnail_url: string;
  

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function initRecipe(sequelize: Sequelize) {
  Recipe.init(
    {
      id: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      unit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      water_footprint: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      ingredients: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      thumbnail_url: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {
      sequelize: sequelize,
      tableName: 'ripple_recipes',
      timestamps: true,
    }
  ).sync({ alter: true });

}
