import express from "express";
import { container } from "../../di/container";
import { TOKENS } from "../../di/tokens";
import { handleAddIngredientRowItemRouteError, handleAddIngredientRowRouteError, handleCalculateWaterFootprintRouteError, handleGetIngredientsRowsRouteError } from "./errorhandling/ErrorResponses";
import { CalcWaterFootPrintReq } from "../../data/requests/waterft_calc/CalcWaterFootprint";
import { AddIngredientGroupPattern } from "../../data/requests/waterft_calc/AddIngredientGroupPattern";
import { AddIngredientGroupPatternItem } from "../../data/requests/waterft_calc/AddIngredientGroupPatternItem";
import { AddIngredient } from '../../data/requests/waterft_calc/AddIngredient';



const router = express.Router();


const waterFtCalcService = container.get(TOKENS.waterFtCalcService);




router.post('/add-ingredient-group-pattern', async (req, res) => {

  try {
    const request: AddIngredientGroupPattern = req.body

    const result = await waterFtCalcService.AddIngredientGroupPattern(request.rank, request.size)

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

router.post('/add-ingredient-group-pattern-item', async (req, res) => {

  try {
    const request: AddIngredientGroupPatternItem = req.body

    const result = await waterFtCalcService.addIngredientGroupPatternItem(request)

    res.status(200).json(
      {
        status_code: 200,
        ingredient_row_item: result,
        message: "IngredientGroupPattern Item added successfully"
      }
    );


  } catch (err) {

    if (err instanceof Error) {
      handleAddIngredientRowItemRouteError(err, res)
    }

  }
});

router.post('/add-ingredient', async(req, res) => {
  try {
    const request: AddIngredient = req.body

    const result = await waterFtCalcService.addIngredient(request)

    res.status(200).json(
      {
        status_code: 200,
        ingredient_row: result,
        message: "ingredient added successfully"
      }
    );


  } catch (err) {

    if (err instanceof Error) {
      
    }

  }
})

router.get('/fetch-ingredients', async (req, res) => {

  try {
    const result = await waterFtCalcService.getIngredientsGroupPatternItems()

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