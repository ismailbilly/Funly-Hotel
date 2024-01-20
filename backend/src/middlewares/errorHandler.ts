import { Request, Response, ErrorRequestHandler, NextFunction } from "express";
import { AppError } from "../utils/error";
import logger from "../utils/logger";
export const errorHandler: ErrorRequestHandler = (error:Error, req:Request, res:Response, next:NextFunction) => {
  console.log(error);

  if (error.name === "ValidationError") {
    logger.error(error)
    return res.status(400).json({
      type: "ValidationError",
      error: error.message,
    });
  }

  if (error instanceof AppError) {
    logger.error(error);
    return res.status(error.statusCode).json(error.serialize());
    }
   logger.error(error);
    return res.status(500).send(error.name);
};
