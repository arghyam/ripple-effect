import { Optional, Model, DataTypes, Sequelize } from "sequelize";
import { IngredientGroupPattern } from "./IngredientGroupPattern";


interface IngredientGroupPatternItemAttributes {
  id: number;
  patternId: number;
  itemNo: number;
  unselectedBgImageUrl: string;
  selectedBgImageUrl: string;
  sampleImageSize: number;
  scaleFactor: number;
  iconScalefactor: number;
  cornerType: string;
  doneXOffSet: number;
  doneYOffSet: number;
  pluseXOffSet: number;
  pluseYOffSet: number;
  minusXOffSet: number;
  minusYOffSet: number;
  xOffset: number;
  yOffset: number;
}

interface IngredientGroupPatternItemCreationAttributes extends Optional<IngredientGroupPatternItemAttributes, 'id'> { }

export class IngredientGroupPatternItem extends Model<IngredientGroupPatternItemAttributes, IngredientGroupPatternItemCreationAttributes> {
  declare id: number;
  declare patternId: number;
  declare itemNo: number;
  declare unselectedBgImageUrl: string;
  declare selectedBgImageUrl: string;
  declare sampleImageSize: number;
  declare scaleFactor: number;
  declare iconScalefactor: number;
  declare cornerType: string;
  declare doneXOffSet: number;
  declare doneYOffSet: number;
  declare pluseXOffSet: number;
  declare pluseYOffSet: number;
  declare minusXOffSet: number;
  declare minusYOffSet: number;
  declare xOffset: number;
  declare yOffset: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}

export function initIngredientGroupPatternItem(sequelize: Sequelize) {

  IngredientGroupPatternItem.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      patternId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: IngredientGroupPattern,
          key: 'id',
        },
      },
      itemNo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      unselectedBgImageUrl: {
        type: DataTypes.STRING,
        allowNull: false
      }, 
      selectedBgImageUrl: {
        type: DataTypes.STRING,
        allowNull: false
      }, 
      sampleImageSize: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      scaleFactor: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      iconScalefactor: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      cornerType: {
        type: DataTypes.STRING,
        allowNull: false
      },
      doneXOffSet: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      doneYOffSet: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      pluseXOffSet: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      pluseYOffSet: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      minusXOffSet: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      minusYOffSet: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      xOffset: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      yOffset: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      
      }
    },
    {
      sequelize: sequelize,
      tableName: 'ingredient_group_pattern_items',
      timestamps: true
    }
  ).sync({ alter: true })
}
