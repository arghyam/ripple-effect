import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { IngredientRow } from "./IngredientRowData";


interface IngredientRowItemAttributes {
    id: number;
    rowId: number;
    itemId: number;
    name: string;
    amt: number;
    unit: string;
    water_footprint: number;
    unselectedBgImageUrl: string;
    selectedBgImageUrl: string;
    sampleImageUrl: string;
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

interface IngredientRowItemCreationAttributes extends Optional<IngredientRowItemAttributes, 'id'> {}

export class IngredientRowItem extends Model<IngredientRowItemAttributes, IngredientRowItemCreationAttributes> {
    static belongsTo(IngredientRow: typeof IngredientRow, arg1: { foreignKey: string; }) {
      throw new Error('Method not implemented.');
    }
    declare id: number;
    declare itemId: number;
    declare rowId: number;
    declare name: string;
    declare amt: number;
    declare unit: string;
    declare water_footprint: number;
    declare unselectedBgImageUrl: string;
    declare selectedBgImageUrl: string;
    declare sampleImageUrl: string;
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
  
  export function initIngredientRowItem(sequelize: Sequelize) {
    
    IngredientRowItem.init(
        {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            primaryKey: true,
          },
          itemId: {
            type: DataTypes.INTEGER,
            allowNull: false,
          
          },
          rowId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: IngredientRow,
                key: 'id',
              },
          },
          name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
          },
          amt: {
            type: DataTypes.DECIMAL,
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
          unselectedBgImageUrl: {
            type: DataTypes.STRING,
            allowNull: false
          }, 
          selectedBgImageUrl: {
            type: DataTypes.STRING,
            allowNull: false
          }, 
          sampleImageUrl: {
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
          tableName: 'ingredient_row_item',
          timestamps: true
        }
      ).sync({ alter: true })

      
}
  