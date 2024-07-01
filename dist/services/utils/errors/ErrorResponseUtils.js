"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleresetPasswordRouteError = exports.handleVerifyOTPRouteError = exports.handleGentOTPRouteError = exports.handleRegisterRouteError = exports.handleLoginRouteError = void 0;
const ErrorCodes_1 = require("./ErrorCodes");
const ErrorUtils_1 = require("./ErrorUtils");
function handleLoginRouteError(err, res) {
    if (err instanceof ErrorUtils_1.DatabaseError) {
        switch (err.code) {
            case ErrorCodes_1.InsertionError:
            case ErrorCodes_1.UpdationError:
            case ErrorCodes_1.DeletionError:
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
    }
    else if (err instanceof ErrorUtils_1.AuthError) {
        switch (err.code) {
            case ErrorCodes_1.UserNotFoundInDB:
            case ErrorCodes_1.InvalidUserCredentials:
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
    }
    else {
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
exports.handleLoginRouteError = handleLoginRouteError;
function handleRegisterRouteError(err, res) {
    if (err instanceof ErrorUtils_1.DatabaseError) {
        switch (err.code) {
            case ErrorCodes_1.InsertionError:
            case ErrorCodes_1.UpdationError:
            case ErrorCodes_1.DeletionError:
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
    }
    else if (err instanceof ErrorUtils_1.AuthError) {
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
    }
    else {
        // Handle other unexpected errors here (optional)
        console.error('Unexpected error:', err);
        res.status(500).json({
            status_code: 500,
            user_info: null,
            message: 'An unexpected error occurred.'
        });
    }
}
exports.handleRegisterRouteError = handleRegisterRouteError;
function handleGentOTPRouteError(err, res) {
    if (err instanceof ErrorUtils_1.DatabaseError) {
        switch (err.code) {
            case ErrorCodes_1.InsertionError:
            case ErrorCodes_1.UpdationError:
            case ErrorCodes_1.DeletionError:
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
    }
    else if (err instanceof ErrorUtils_1.AuthError) {
        switch (err.code) {
            case ErrorCodes_1.ForgotPasswordEmailNotSent:
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
    }
    else {
        // Handle other unexpected errors here (optional)
        console.error('Unexpected error:', err);
        res.status(500).json({
            status_code: 500,
            message: 'An unexpected error occurred.'
        });
    }
}
exports.handleGentOTPRouteError = handleGentOTPRouteError;
function handleVerifyOTPRouteError(err, res) {
    if (err instanceof ErrorUtils_1.DatabaseError) {
        switch (err.code) {
            case ErrorCodes_1.InsertionError:
            case ErrorCodes_1.UpdationError:
            case ErrorCodes_1.DeletionError:
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
    }
    else if (err instanceof ErrorUtils_1.AuthError) {
        switch (err.code) {
            case ErrorCodes_1.InvalidOTPCredentials:
            case ErrorCodes_1.OTPValidityExpired:
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
    }
    else {
        // Handle other unexpected errors here (optional)
        console.error('Unexpected error:', err);
        res.status(500).json({
            status_code: 500,
            access_token: null,
            message: 'An unexpected error occurred.'
        });
    }
}
exports.handleVerifyOTPRouteError = handleVerifyOTPRouteError;
function handleresetPasswordRouteError(err, res) {
    if (err instanceof ErrorUtils_1.DatabaseError) {
        switch (err.code) {
            case ErrorCodes_1.InsertionError:
            case ErrorCodes_1.UpdationError:
            case ErrorCodes_1.DeletionError:
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
    }
    else if (err instanceof ErrorUtils_1.AuthError) {
        switch (err.code) {
            case ErrorCodes_1.InvalidResetPasswordToken:
            case ErrorCodes_1.ResetPasswordTokenExpired:
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
    }
    else {
        // Handle other unexpected errors here (optional)
        console.error('Unexpected error:', err);
        res.status(500).json({
            status_code: 500,
            message: 'An unexpected error occurred.'
        });
    }
}
exports.handleresetPasswordRouteError = handleresetPasswordRouteError;
