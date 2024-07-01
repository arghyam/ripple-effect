"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initOtp = exports.Otp = void 0;
const sequelize_1 = require("sequelize");
;
class Otp extends sequelize_1.Model {
}
exports.Otp = Otp;
function initOtp(sequelize) {
    console.log("Otp models were synchronized successfully.");
    Otp.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        otp_hash: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        generated_at: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true, // Optional timestamp
        },
    }, {
        sequelize,
        tableName: 'otps'
    }).sync({ alter: true });
}
exports.initOtp = initOtp;
