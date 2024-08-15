import { Optional, Model, DataTypes, Sequelize } from "sequelize";


interface IngredientRowAttributes {
    id: number;
    rowOrder: number;
}

interface IngredientRowCreationAttributes extends Optional<IngredientRowAttributes, 'id'> {}

export class IngredientRow extends Model<IngredientRowAttributes, IngredientRowCreationAttributes> {
  declare id: number;
  declare rowOrder: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}

export function initIngredientRow(sequelize: Sequelize) {
  
  IngredientRow.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        rowOrder: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
        }
      },
      {
        sequelize: sequelize,
        tableName: 'ingredient_rows',
        timestamps: true
      }
    ).sync({ alter: true })
  }
