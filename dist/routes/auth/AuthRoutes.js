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
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const container_1 = require("../../di/container");
const tokens_1 = require("../../di/tokens");
const ErrorCodes_1 = require("../../utils/errors/ErrorCodes");
const ErrorResponses_1 = require("./errorhandling/ErrorResponses");
const ErrorUtils_1 = require("../../utils/errors/ErrorUtils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
const authService = container_1.container.get(tokens_1.TOKENS.authService);
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            throw new ErrorUtils_1.AuthError("please enter correct format of details", ErrorCodes_1.InvalidUserCredentials);
        }
        const userData = req.body;
        const userResData = yield authService.registerUser(userData);
        res.json({
            status_code: 200,
            user_info: {
                id: userResData.id,
                name: userResData.name,
                email: userResData.email
            },
            message: "user inserted succefully in the database"
        });
    }
    catch (err) {
        if (err instanceof Error) {
            (0, ErrorResponses_1.handleRegisterRouteError)(err, res);
        }
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            throw new ErrorUtils_1.AuthError("please enter correct format of details", ErrorCodes_1.InvalidUserCredentials);
        }
        const userData = req.body;
        const userResData = yield authService.loginUser(userData);
        res.status(200).json({
            status_code: 200,
            access_token: userResData.access_token,
            user_info: {
                id: userResData.user_id,
                name: userResData.name,
                email: userResData.email
            },
            message: 'User loggedIn successfully'
        });
    }
    catch (err) {
        if (err instanceof Error) {
            (0, ErrorResponses_1.handleLoginRouteError)(err, res);
        }
    }
}));
router.post('/generate-otp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emailData = req.body;
        const timestamp = yield authService.generateForgotPasswordOTP(emailData.email);
        res.status(200).json({
            status_code: 200,
            created_on: timestamp,
            message: `otp has been sent to an email: ${emailData.email}`
        });
    }
    catch (err) {
        if (err instanceof Error) {
            (0, ErrorResponses_1.handleGentOTPRouteError)(err, res);
        }
    }
}));
router.post('/verify-otp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verifyOtpReq = req.body;
        const result = yield authService.verifyOtp(verifyOtpReq.otp, verifyOtpReq.email, verifyOtpReq.created_on);
        res.status(200).json({
            status_code: 200,
            access_token: result.access_token,
            message: "otp verified successfully"
        });
    }
    catch (err) {
        if (err instanceof Error) {
            (0, ErrorResponses_1.handleVerifyOTPRouteError)(err, res);
        }
    }
}));
const validateAuthorization = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized: Missing authorization header' });
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Unauthorized: Invalid authorization format' });
    }
    try {
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return res.status(401).json({ message: 'Unauthorized: Token expired' });
        }
        else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token signature' });
        }
        else {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};
router.post('/reset-password', validateAuthorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqest = req.body;
        const result = yield authService.resetPassword(reqest.new_password, reqest.email);
        if (result) {
            res.status(200).json({
                status_code: 200,
                message: "password reset successfully"
            });
        }
        else {
            res.status(200).json({
                status_code: 200,
                message: "password reset failed"
            });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            (0, ErrorResponses_1.handleresetPasswordRouteError)(err, res);
        }
    }
}));
exports.default = router;
