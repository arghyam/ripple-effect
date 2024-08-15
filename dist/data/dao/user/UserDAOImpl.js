"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDAOImpl = void 0;
const Otp_1 = require("../../db_models/Otp");
const User_1 = require("../../db_models/User");
const ErrorCodes_1 = require("../../../utils/errors/ErrorCodes");
const ErrorUtils_1 = require("../../../utils/errors/ErrorUtils");
const uuid_1 = require("uuid");
class UserDAOImpl {
    updatePassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [updatedCount] = yield User_1.User.update({ password_hash: password }, { where: { email: email } });
                return updatedCount == 1;
            }
            catch (error) {
                throw new ErrorUtils_1.DatabaseError("e is not a instance of Error: UserDAOImpl --- updatePassword", ErrorCodes_1.UnknownDatabaseError);
            }
        });
    }
    insertOtp(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const now = new Date();
                const id = (0, uuid_1.v6)();
                const otpData = yield Otp_1.Otp.create({ id: id, email: email, otp_hash: otp, generated_at: now.getTime() });
                return otpData;
            }
            catch (error) {
                if (error instanceof ErrorUtils_1.AuthError) {
                    throw error;
                }
                else if (error instanceof Error) {
                    throw new ErrorUtils_1.DatabaseError(error.message, ErrorCodes_1.InsertOTPUserDAO);
                }
                else {
                    throw new ErrorUtils_1.DatabaseError("e is not a instance of Error: UserDAOImpl --- insertOtp", ErrorCodes_1.UnknownDatabaseError);
                }
            }
        });
    }
    getOtp(email, timestamp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const otpRow = yield Otp_1.Otp.findOne({
                    where: {
                        email: email,
                        generated_at: timestamp
                    }
                });
                if (otpRow == null) {
                    throw new ErrorUtils_1.AuthError("otp with email: " + email + "doesn't exist in the database", ErrorCodes_1.OTPNotFoundInDB);
                }
                return otpRow;
            }
            catch (error) {
                if (error instanceof ErrorUtils_1.AuthError) {
                    throw error;
                }
                else if (error instanceof Error) {
                    throw new ErrorUtils_1.DatabaseError("error.message", ErrorCodes_1.IsEmailExistUserDAO);
                }
                else {
                    throw new ErrorUtils_1.DatabaseError("e is not a instance of Error: UserDAOImpl --- getOtp", ErrorCodes_1.UnknownDatabaseError);
                }
            }
        });
    }
    insertUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = (0, uuid_1.v6)();
                const user = yield User_1.User.create({ id: userId, name: userData.name, email: userData.email, password_hash: userData.password_hash, leaderboard_rank: 0, total_water_footprint: 0 });
                return user;
            }
            catch (error) {
                if (error instanceof ErrorUtils_1.AuthError) {
                    throw error;
                }
                else if (error instanceof Error) {
                    throw new ErrorUtils_1.DatabaseError(error.message, ErrorCodes_1.InsertUserUSerDAO);
                }
                else {
                    throw new ErrorUtils_1.DatabaseError("e is not a instance of Error: UserDAOImpl --- insertUser", ErrorCodes_1.UnknownDatabaseError);
                }
            }
        });
    }
    fetchUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emailToFind = email;
                const user = yield User_1.User.findOne({
                    where: {
                        email: emailToFind
                    }
                });
                if (user == null) {
                    throw new ErrorUtils_1.AuthError("user with email: " + email + " is not found in the database", ErrorCodes_1.UserNotFoundInDB);
                }
                return user;
            }
            catch (error) {
                if (error instanceof ErrorUtils_1.AuthError) {
                    throw error;
                }
                else if (error instanceof Error) {
                    throw new ErrorUtils_1.DatabaseError(error.message, ErrorCodes_1.FetchUserByEmail);
                }
                else {
                    throw new ErrorUtils_1.DatabaseError("e is not a instance of Error: UserDAOImpl --- fetchUserByEmail", ErrorCodes_1.UnknownDatabaseError);
                }
            }
        });
    }
}
exports.UserDAOImpl = UserDAOImpl;
