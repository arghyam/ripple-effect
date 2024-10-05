import express from "express";
import { container } from "../../di/container";
import { TOKENS } from "../../di/tokens";
import { CalcWaterFootPrintReq } from "../../data/requests/waterft_calc/CalcWaterFootprint";
import { AddIngredient } from '../../data/requests/waterft_calc/AddIngredient';



const router = express.Router();


const waterFtCalcService = container.get(TOKENS.waterFtCalcService);



router.post('/add-ingredient', async (req, res, next) => {
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

    next(err)

  }
})


router.get('/get-recipes', async (req, res, next) => {
  try {
    const page_size = Number(req.query.page_size)
    const page = Number(req.query.page)
    const query = String(req.query.query)

    if (!page_size || !page) {
      return res.status(400).json({
        status_code: 400,
        recipes: null,
        message: "Query Data is required to get recipes"
      })
    }

    const result = await waterFtCalcService.getRecipes(page_size, page, query)

    res.status(200).json({
      status_code: 200,
      recipes: result,
      message: "Recipes fetched successfully"
    })
  } catch (error) {
    next(error)
  }
})

router.get('/get-recipe', async (req, res, next) => {
  try {
    const id = String(req.query.id)


    if (!id) {
      return res.status(400).json({
        status_code: 400,
        message: "Data is required to get recipes"
      })
    }

    const result = await waterFtCalcService.getRecipe(id)

    res.status(200).json({
      status_code: 200,
      recipe: result,
      message: "Recipes fetched successfully"
    })
  } catch (error) {
    next(error)
  }
})



router.post('/calc-water-footprint', async (req, res, next) => {
  try {
    const request: CalcWaterFootPrintReq = req.body;


    if (!request.data || request.data.length === 0) {
      return res.status(400).json({
        status_code: 400,
        message: "Data is required to calculate water footprint"
      })
    }

    const result = await waterFtCalcService.calculateWaterFootprint(request.user_id, request.data)

    res.status(200).json({
      status_code: 200,
      water_footprint: result,
      message: "Water footprint calculated successfully"
    })

  } catch (error) {
    next(error)
  }
})

router.get('/get-user-wft-progress', async (req, res, next) => {
  try {

    const userId = req.query.userId as string


    const result = await waterFtCalcService.getUserWftProgress(userId)

    res.status(200).json(
      {
        status_code: 200,
        queryResult: result,
        message: "water footprint calculated successfully"
      }
    );
  } catch (err) {

    next(err)

  }
})

router.get('/get-user-wft', async (req, res, next) => {
  try {

    const userId = req.query.userId as string


    const result = await waterFtCalcService.getUserWft(userId)

    res.status(200).json(
      {
        status_code: 200,
        user_total_waterfootprint: result,
        message: "water footprint calculated successfully"
      }
    );
  } catch (err) {

    next(err)

  }
})


export default router