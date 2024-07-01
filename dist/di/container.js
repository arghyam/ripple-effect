"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const UserDAOImpl_1 = require("../data/dao/user/UserDAOImpl");
const brandi_1 = require("brandi");
const tokens_1 = require("./tokens");
const AuthService_1 = require("../services/AuthService");
exports.container = new brandi_1.Container();
exports.container
    .bind(tokens_1.TOKENS.userDao)
    .toInstance(UserDAOImpl_1.UserDAOImpl)
    .inTransientScope();
exports.container
    .bind(tokens_1.TOKENS.authService)
    .toInstance(AuthService_1.AuthService)
    .inTransientScope();
