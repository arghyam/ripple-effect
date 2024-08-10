import express from "express";
import { container } from "../../di/container";
import { TOKENS } from "../../di/tokens";
import { handleAddIngredientRowItemRouteError, handleAddIngredientRowRouteError, handleCalculateWaterFootprintRouteError, handleGetIngredientsRowsRouteError } from "./errorhandling/ErrorResponses";
import { CalcWaterFootPrintReq } from "../../data/requests/waterft_calc/CalcWaterFootprint";
import { InsertIngredientRow } from "../../data/requests/waterft_calc/InsertIngredientRow";
import { InsertIngredientRowItem } from '../../data/requests/waterft_calc/InsertIngredientRowItem';



const router = express.Router();


const waterFtCalcService = container.get(TOKENS.waterFtCalcService);




router.post('/add-ingredient-row', async (req, res) => {

  try {
    const request: InsertIngredientRow = req.body

    const result = await waterFtCalcService.addIngredientRow(request.rowOrder)

    res.status(200).json(
      {
        status_code: 200,
        ingredient_row: result,
        message: "ingredient Row added successfully"
      }
    );


  } catch (err) {

    if (err instanceof Error) {
      handleAddIngredientRowRouteError(err, res)
    }

  }
});

router.post('/add-ingredient-row-item', async (req, res) => {

  try {
    const request: InsertIngredientRowItem = req.body

    const result = await waterFtCalcService.addIngredientRowItem(request)

    res.status(200).json(
      {
        status_code: 200,
        ingredient_row_item: result,
        message: "ingredient Row Item added successfully"
      }
    );


  } catch (err) {

    if (err instanceof Error) {
      handleAddIngredientRowItemRouteError(err, res)
    }

  }
});

router.get('/fetch-ingredients', async (req, res) => {

  try {
    const result = await waterFtCalcService.getIngredientsRows()

    res.status(200).json(
      {
        status_code: 200,
        data: result,
        message: "ingredients data fetched successfully"
      }
    )


  } catch (err) {

    if (err instanceof Error) {
      handleGetIngredientsRowsRouteError(err, res)
    }

  }
});

router.post('/calc-water-footprint', async (req, res) => {
  try {

    const request: CalcWaterFootPrintReq = req.body
    const result = await waterFtCalcService.calculateWaterFootprint(request)

    res.status(200).json(
      {
        status_code: 200,
        water_footprint: result,
        message: "water footprint calculated successfully"
      }
    );
  } catch (err) {

    if (err instanceof Error) {
      handleCalculateWaterFootprintRouteError(err, res)
    }

  }
});


export default router;