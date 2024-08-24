import { Response } from "express";
import { InsertionError } from "../../../utils/errors/ErrorCodes";
import { AuthError, DatabaseError } from "../../../utils/errors/ErrorUtils";
import { UserNotFoundInDB, InvalidUserCredentials } from "../../auth/errorhandling/ErrorCodes";



export function handlegetLeaderboardRouteError(err: Error, res: Response) {
    if (err instanceof DatabaseError) {
        switch (err.code) {
            case InsertionError:
                res.status(500).json({
                    status_code: 500,
                    access_token: null,
                    user_info: null,
                    message: err.message
                });
                break;
            default:
                res.status(500).json({
                    status_code: 500,
                    access_token: null,
                    user_info: null,
                    message: 'Unknown database error'
                });
        }
    } else if (err instanceof AuthError) {
        switch (err.code) {
            case UserNotFoundInDB:
            case InvalidUserCredentials:
                res.status(404).json({
                    status_code: 404,
                    access_token: null,
                    user_info: null,
                    message: err.message
                });
                break;
            default:
                res.status(500).json({
                    status_code: 500,
                    access_token: null,
                    user_info: null,
                    message: 'Unknown authentication error'
                });
        }
    } else {
        // Handle other unexpected errors here (optional)
        console.error('Unexpected error:', err);
        res.status(500).json({
            status_code: 500,
            access_token: null,
            user_info: null,
            message: 'An unexpected error occurred.'
        });
    }
}