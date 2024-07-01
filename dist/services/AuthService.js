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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const brandi_1 = require("brandi");
const tokens_1 = require("../di/tokens");
const nodemailer_1 = __importDefault(require("nodemailer"));
const otp_generator_1 = __importDefault(require("otp-generator"));
const ErrorCodes_1 = require("./utils/errors/ErrorCodes");
const ErrorUtils_1 = require("./utils/errors/ErrorUtils");
class AuthService {
    constructor(userDAO) {
        this.userDAO = userDAO;
    }
    registerUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = bcryptjs_1.default.genSaltSync(10);
            const hashedPassword = bcryptjs_1.default.hashSync(userData.password, salt);
            const userdata = {
                name: userData.name,
                email: userData.email,
                password_hash: hashedPassword
            };
            const insertedUser = yield this.userDAO.insertUser(userdata);
            return insertedUser;
        });
    }
    loginUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userDAO.fetchUserByEmail(userData.email);
            const isMatch = bcryptjs_1.default.compareSync(userData.password, user.password_hash);
            if (!isMatch) {
                throw new ErrorUtils_1.AuthError("user with provided credential doesn't exist", ErrorCodes_1.InvalidUserCredentials);
            }
            // Create JWT access token
            const secret = "Puddle@2024";
            const payload = { user: { email: user.email, id: user.id } };
            const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '3600s' }); // Token expires in 1 hour
            const loginUserResData = {
                access_token: token,
                user_id: user.id,
                name: user.name,
                email: user.email
            };
            return loginUserResData;
        });
    }
    generateForgotPasswordOTP(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const otp = otp_generator_1.default.generate(6, { digits: true, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
            const salt = bcryptjs_1.default.genSaltSync(10);
            const hashedOTP = bcryptjs_1.default.hashSync(otp, salt);
            yield this.userDAO.insertOtp(email, hashedOTP);
            const transporter = nodemailer_1.default.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // Use `true` for port 465, `false` for all other ports
                auth: {
                    user: "kevalkanpariya5051@gmail.com",
                    pass: "gzyx bsat edtf dmsf",
                },
            });
            const mailOptions = {
                from: 'kevalkanpariya5051@gmail.com',
                to: email,
                subject: 'Forgot password otp for Puddle App',
                text: 'your forgot password otp is: ' + otp,
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                    throw new ErrorUtils_1.AuthError("we're facing an issue to send an email: " + error.message, ErrorCodes_1.ForgotPasswordEmailNotSent);
                }
                else {
                    console.log('Email sent: %s', info);
                }
            });
            return "otp has been sent to an email address: " + email;
        });
    }
    verifyOtp(otp, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const otpRow = yield this.userDAO.getOtp(email, otp);
            const isMatch = bcryptjs_1.default.compareSync(otp, otpRow.otp_hash);
            if (!isMatch) {
                throw new ErrorUtils_1.AuthError("please enter valid otp", ErrorCodes_1.InvalidOTPCredentials);
            }
            const now = new Date();
            const fiveMinutesAgo = new Date(now.getTime() - (5 * 60 * 1000));
            if (otpRow.generated_at < fiveMinutesAgo) {
                throw new ErrorUtils_1.AuthError("otp has been expired", ErrorCodes_1.OTPValidityExpired);
            }
            const secret = "Puddle@2024";
            const payload = { user: { email: email, otp: otp } };
            const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '3600s' });
            const verifyOtpResData = {
                access_token: token,
                email: email
            };
            return verifyOtpResData;
        });
    }
    resetPassword(accessToken, newPassword, email) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verify the token signature and decode the payload
            const secret = "Puddle@2024";
            // throw an error is token is not valid
            const decoded = jsonwebtoken_1.default.verify(accessToken, secret);
            if (!isJwtPayload(decoded)) {
                throw new ErrorUtils_1.AuthError("token is invalid", ErrorCodes_1.InvalidResetPasswordToken);
            }
            // Check if the token has expired (optional)
            if (decoded.exp < Date.now() / 1000) {
                throw new ErrorUtils_1.AuthError('Token is expired', ErrorCodes_1.ResetPasswordTokenExpired);
            }
            const salt = bcryptjs_1.default.genSaltSync(10);
            const hashedPassword = bcryptjs_1.default.hashSync(newPassword, salt);
            const isUpdated = yield this.userDAO.updatePassword(email, hashedPassword);
            return isUpdated;
        });
    }
}
exports.AuthService = AuthService;
function isJwtPayload(decoded) {
    return typeof decoded === 'object' && 'sub' in decoded; // Check for basic object and 'sub' claim
}
(0, brandi_1.injected)(AuthService, tokens_1.TOKENS.userDao);
