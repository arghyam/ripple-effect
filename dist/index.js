"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const express_1 = __importDefault(require("express"));
const winston_1 = __importDefault(require("winston"));
const AuthRoutes_1 = __importDefault(require("./routes/auth/AuthRoutes"));
const User_1 = require("./domain/models/User");
const db_1 = __importDefault(require("./db"));
const Otp_1 = require("./domain/models/Otp");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//const cors = require('cors'); // Enable if needed for CORS
//nodemailer app password: gzyx bsat edtf dmsf
(0, User_1.initUser)(db_1.default);
(0, Otp_1.initOtp)(db_1.default);
const jwtSecret = process.env.JWT_SECRET;
const databaseUrl = process.env.DATABASE_URL;
console.log(`JWT_SECRET: ${jwtSecret}`);
console.log(`DATABASE_URL: ${databaseUrl}`);
exports.logger = winston_1.default.createLogger({
    level: 'info', // Set the minimum log level
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
    transports: [
        new winston_1.default.transports.Console() // Log to console
    ]
});
const app = (0, express_1.default)();
const port = 3000;
// Body parser middleware (already included in Express.js)
app.use(express_1.default.json());
app.use('/api/auth', AuthRoutes_1.default);
app.get('/', (req, res) => {
    exports.logger.info('Received a GET request to the root path');
    res.send('Welcome to my server!');
});
app.listen(port, () => {
    exports.logger.info(`Server is running on port ${port}`);
});
