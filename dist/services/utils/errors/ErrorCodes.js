"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidResetPasswordToken = exports.ResetPasswordTokenExpired = exports.OTPValidityExpired = exports.InvalidOTPCredentials = exports.ForgotPasswordEmailNotSent = exports.InvalidUserCredentials = exports.OTPNotFoundInDB = exports.UserNotFoundInDB = exports.InsertOTPUserDAO = exports.FetchUserByEmail = exports.FetchUserUserDAO = exports.InsertUserUSerDAO = exports.IsEmailExistUserDAO = exports.UnknownDatabaseError = exports.DatabaseDisconnected = exports.ReadError = exports.DeletionError = exports.UpdationError = exports.InsertionError = void 0;
//CRUD Operation Errors
exports.InsertionError = 1;
exports.UpdationError = 2;
exports.DeletionError = 3;
exports.ReadError = 4;
//Connection Errors
exports.DatabaseDisconnected = 5;
exports.UnknownDatabaseError = 6;
//Function Specific Errors -- UserDAO
exports.IsEmailExistUserDAO = 7;
exports.InsertUserUSerDAO = 8;
exports.FetchUserUserDAO = 9;
exports.FetchUserByEmail = 10;
exports.InsertOTPUserDAO = 11;
//error
exports.UserNotFoundInDB = 12;
exports.OTPNotFoundInDB = 13;
exports.InvalidUserCredentials = 14;
exports.ForgotPasswordEmailNotSent = 15;
exports.InvalidOTPCredentials = 16;
exports.OTPValidityExpired = 17;
exports.ResetPasswordTokenExpired = 18;
exports.InvalidResetPasswordToken = 19;
