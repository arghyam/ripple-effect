import { Response } from "express";
import { GetIngredientRowItemsDAOError, GetIngredientRowsDAOError, GetWaterConsumptionOfIngredientDAOError, InsertIngredientRowDAOError, InsertIngredientRowItemDAOError } from "./ErrorCodes";
import { WaterFtCalcError } from "./ErrorUtils";
import { DatabaseError } from "../../../utils/errors/ErrorUtils";

export function handleAddIngredientRowRouteError(err: Error, res: Response) {
    if (err instanceof DatabaseError) {
        switch (err.code) {
            
            case InsertIngredientRowDAOError:
                
                res.status(500).json({
                    status_code: 500,
                    ingredient_row: null,
                    message: err.message
                });
                break;
            default:
                res.status(500).json({
                    status_code: 500,
                    ingredient_row: null,
                    message: err.message
                });
        }
    } else if (err instanceof WaterFtCalcError) {
        switch (err.code) {
            default:
                res.status(500).json({
                    status_code: 500,
                    ingredient_row: null,
                    message: 'Unknown water_footprint_calculator error'
                });
        }
    } else {
        res.status(500).json({
            status_code: 500,
            ingredient_row: null,
            message: 'An unexpected error occurred.'
        });
    }
}

export function handleAddIngredientRowItemRouteError(err: Error, res: Response) {
    if (err instanceof DatabaseError) {
        switch (err.code) {
            
            case InsertIngredientRowItemDAOError:
                
                res.status(500).json({
                    status_code: 500,
                    ingredient_row_item: null,
                    message: err.message
                });
                break;
            default:
                res.status(500).json({
                    status_code: 500,
                    ingredient_row_item: null,
                    message: err.message
                });
        }
    } else if (err instanceof WaterFtCalcError) {
        switch (err.code) {
            default:
                res.status(500).json({
                    status_code: 500,
                    ingredient_row_item: null,
                    message: 'Unknown water_footprint_calculator error'
                });
        }
    } else {
        res.status(500).json({
            status_code: 500,
            ingredient_row_item: null,
            message: 'An unexpected error occurred.'
        });
    }
}

export function handleGetIngredientsRowsRouteError(err: Error, res: Response) {
    if (err instanceof DatabaseError) {
        switch (err.code) {
            
            case GetIngredientRowsDAOError:
            case GetIngredientRowItemsDAOError:
                
                res.status(500).json({
                    status_code: 500,
                    data: null,
                    message: err.message
                });
                break;
            default:
                res.status(500).json({
                    status_code: 500,
                    data: null,
                    message: err.message
                });
        }
    } else if (err instanceof WaterFtCalcError) {
        switch (err.code) {
            case GetIngredientRowsDAOError:
            case GetIngredientRowItemsDAOError:
                res.status(500).json({
                    status_code: 500,
                    data: null,
                    message: err.message
                });
                break;
            
            default:
                res.status(500).json({
                    status_code: 500,
                    data: null,
                    message: 'Unknown water_footprint_calculator error'
                });
        }
    } else {
        res.status(500).json({
            status_code: 500,
            data: null,
            message: 'An unexpected error occurred.'
        });
    }
}

export function handleCalculateWaterFootprintRouteError(err: Error, res: Response) {
    if (err instanceof DatabaseError) {
        switch (err.code) {
            
            case GetWaterConsumptionOfIngredientDAOError:
                
                res.status(500).json({
                    status_code: 500,
                    water_footprint: null,
                    message: err.message
                });
                break;
            default:
                res.status(500).json({
                    status_code: 500,
                    water_footprint: null,
                    message: err.message
                });
        }
    } else if (err instanceof WaterFtCalcError) {
        switch (err.code) {
            default:
                res.status(500).json({
                    status_code: 500,
                    water_footprint: false,
                    message: 'Unknown water_footprint_calculator error'
                });
        }
    } else {
        res.status(500).json({
            status_code: 500,
            water_footprint: null,
            message: 'An unexpected error occurred.'
        });
    }
}

