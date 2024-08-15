"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const express_1 = __importDefault(require("express"));
const winston_1 = __importDefault(require("winston"));
const AuthRoutes_1 = __importDefault(require("./routes/auth/AuthRoutes"));
const WaterfootprintCalcRoutes_1 = __importDefault(require("./routes/water_ft_catculator/WaterfootprintCalcRoutes"));
const User_1 = require("./data/db_models/User");
const db_1 = __importDefault(require("./db"));
const Otp_1 = require("./data/db_models/Otp");
const dotenv = __importStar(require("dotenv-flow"));
const path_1 = __importDefault(require("path"));
const IngredientRowData_1 = require("./data/db_models/IngredientRowData");
const IngredientRowItem_1 = require("./data/db_models/IngredientRowItem");
const WaterFtCalcResult_1 = require("./data/db_models/WaterFtCalcResult");
dotenv.config({ path: '../' });
(0, User_1.initUser)(db_1.default);
(0, Otp_1.initOtp)(db_1.default);
(0, IngredientRowData_1.initIngredientRow)(db_1.default);
(0, IngredientRowItem_1.initIngredientRowItem)(db_1.default);
(0, WaterFtCalcResult_1.initWaterFtCalcResult)(db_1.default);
IngredientRowData_1.IngredientRow.hasMany(IngredientRowItem_1.IngredientRowItem, { foreignKey: 'rowId' });
IngredientRowItem_1.IngredientRowItem.belongsTo(IngredientRowData_1.IngredientRow, { foreignKey: 'rowId' });
User_1.User.hasMany(WaterFtCalcResult_1.WaterFtCalcResult, { foreignKey: 'user_id' });
WaterFtCalcResult_1.WaterFtCalcResult.belongsTo(User_1.User, { foreignKey: 'user_id' });
exports.logger = winston_1.default.createLogger({
    level: 'info', // Set the minimum log level
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
    transports: [
        new winston_1.default.transports.Console() // Log to console
    ]
});
console.log(`index file: ${process.env.DB_HOST}`);
console.log(`index file: ${process.env.DB_USERNAME}`);
db_1.default.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));
const app = (0, express_1.default)();
// Body parser middleware (already included in Express.js)
app.use(express_1.default.json());
app.use('/images', express_1.default.static(path_1.default.join(__dirname, 'resources', 'public')));
app.use('/api/auth', AuthRoutes_1.default);
app.use('/api/user/', WaterfootprintCalcRoutes_1.default);
app.get('/', (req, res) => {
    exports.logger.info('Received a GET request to the root path');
    res.send('Welcome to my server!');
});
app.listen(() => {
    exports.logger.info(`Server is running on port`);
});
