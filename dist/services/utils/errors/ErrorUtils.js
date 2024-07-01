"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthError = exports.DatabaseError = void 0;
class DatabaseError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
        this.name = 'DatabaseError';
    }
}
exports.DatabaseError = DatabaseError;
class AuthError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
        this.name = 'AuthError';
    }
}
exports.AuthError = AuthError;
