import { Request, Response, NextFunction } from 'express';
import { BaseError } from "../errors/BaseError";
import { ConnectionError, ValidationError, DatabaseError, QueryError, BaseError as SequelizeBaseError } from "sequelize";
import jwt from 'jsonwebtoken';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof BaseError) {
    res.status(err.statusCode).json({
      status_code: err.statusCode,
      error: err.message,
      error_code: err.errorCode,
    });
  } else if (err instanceof ConnectionError) {
    res.status(500).json({
      status_code: 500,
      error: err.message,
      error_code: "Sequalize ConnectionError"
    });
  } else if (err instanceof ValidationError) {
    res.status(400).json({
      status_code: 400,
      error: err.message,
     error_code: "Sequalize ValidationError"
    });
  } else if (err instanceof DatabaseError) {
    res.status(500).json({
      status_code: 500,
      error: err.message,
      error_code: "Sequalize DatabaseError"
    });
  } else if (err instanceof QueryError) {
    res.status(500).json({
      status_code: 500,
      error: err.message,
      error_code: "Sequalize QueryError"
    });
  } else if (err instanceof SequelizeBaseError) {
    res.status(500).json({
      status_code: 500,
      error: err.message,
      error_code: "Sequalize SequelizeBaseError"
    });
  } else if (err instanceof jwt.TokenExpiredError) {
    res.status(401).json({
      status_code: 401,
      error: err.message,
      message: 'Unauthorized: Token expired',
    });
  } else if (err instanceof jwt.JsonWebTokenError) {
    res.status(401).json({
      status_code: 401,
      error: err.message,
      message: 'Unauthorized: Invalid token signature',
    });
  } else if (err instanceof Error) {
    res.status(500).json({
      status_code: 500,
      error: err.message,
      message: "An internal server error occurred. Please try again later.",
    });
  } else {
    res.status(500).json({
      status_code: 500,
      message: "An unknown server error occurred. Please try again later.",
    });
  }
};

export default errorHandler;
