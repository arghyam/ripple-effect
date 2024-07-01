import { Response } from "express";
import { DeletionError, ForgotPasswordEmailNotSent, InsertionError, InvalidOTPCredentials, InvalidResetPasswordToken, InvalidUserCredentials, OTPValidityExpired, ResetPasswordTokenExpired, UpdationError, UserNotFoundInDB } from "./ErrorCodes";
import { AuthError, DatabaseError } from "./ErrorUtils";


export function handleLoginRouteError(err: Error, res: Response) {
    if (err instanceof DatabaseError) {
        switch (err.code) {
            case InsertionError:
            case UpdationError:
            case DeletionError:
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

export function handleRegisterRouteError(err: Error, res: Response) {

    if (err instanceof DatabaseError) {
        switch (err.code) {
            case InsertionError:
            case UpdationError:
            case DeletionError:
                res.status(500).json({
                    status_code: 500,
                    user_info: null,
                    message: err.message
                });
                break;
            default:
                res.status(500).json({
                    status_code: 500,
                    user_info: null,
                    message: 'Unknown database error'
                });
        }
    } else if (err instanceof AuthError) {
        switch (err.code) {
            case 12:
                res.status(404).json({
                    status_code: 404,
                    user_info: null,
                    message: err.message
                });
                break;
            default:
                res.status(500).json({
                    status_code: 500,
                    user_info: null,
                    message: 'Unknown authentication error'
                });
        }
    } else {
        // Handle other unexpected errors here (optional)
        console.error('Unexpected error:', err);
        res.status(500).json({
            status_code: 500,
            user_info: null,
            message: 'An unexpected error occurred.'
        });
    }

}

export function handleGentOTPRouteError(err: Error, res: Response) {
    if (err instanceof DatabaseError) {
        switch (err.code) {
            case InsertionError:
            case UpdationError:
            case DeletionError:
                res.status(500).json({
                    status_code: 500,
                    message: err.message
                });
                break;
            default:
                res.status(500).json({
                    status_code: 500,
                    message: 'Unknown database error'
                });
        }
    } else if (err instanceof AuthError) {
        switch (err.code) {
            case ForgotPasswordEmailNotSent:
                res.status(404).json({
                    status_code: 404,
                    message: err.message
                });
                break;
            default:
                res.status(500).json({
                    status_code: 500,
                    message: 'Unknown authentication error'
                });
        }
    } else {
        // Handle other unexpected errors here (optional)
        console.error('Unexpected error:', err);
        res.status(500).json({
            status_code: 500,
            message: 'An unexpected error occurred.'
        });
    }
}

export function handleVerifyOTPRouteError(err: Error, res: Response) {
    if (err instanceof DatabaseError) {
        switch (err.code) {
            case InsertionError:
            case UpdationError:
            case DeletionError:
                res.status(500).json({
                    status_code: 500,
                    access_token: null,
                    message: err.message
                });
                break;
            default:
                res.status(500).json({
                    status_code: 500,
                    access_token: null,
                    message: 'Unknown database error'
                });
        }
    } else if (err instanceof AuthError) {
        switch (err.code) {
            case InvalidOTPCredentials:
            case OTPValidityExpired:
                res.status(400).json({
                    status_code: 404,
                    access_token: null,
                    message: err.message
                });
                break;
            default:
                res.status(500).json({
                    status_code: 500,
                    access_token: null,
                    message: 'Unknown authentication error'
                });
        }
    } else {
        // Handle other unexpected errors here (optional)
        console.error('Unexpected error:', err);
        res.status(500).json({
            status_code: 500,
            access_token: null,
            message: 'An unexpected error occurred.'
        });
    }
}

export function handleresetPasswordRouteError(err: Error, res: Response) {
    if (err instanceof DatabaseError) {
        switch (err.code) {
            case InsertionError:
            case UpdationError:
            case DeletionError:
                res.status(500).json({
                    status_code: 500,
                    message: err.message
                });
                break;
            default:
                res.status(500).json({
                    status_code: 500,
                    message: 'Unknown database error'
                });
        }
    } else if (err instanceof AuthError) {
        switch (err.code) {
            case InvalidResetPasswordToken:
            case ResetPasswordTokenExpired:
                res.status(400).json({
                    status_code: 404,
                    message: err.message
                });
                break;
            default:
                res.status(500).json({
                    status_code: 500,
                    message: 'Unknown authentication error'
                });
        }
    } else {
        // Handle other unexpected errors here (optional)
        console.error('Unexpected error:', err);
        res.status(500).json({
            status_code: 500,
            message: 'An unexpected error occurred.'
        });
    }
}
