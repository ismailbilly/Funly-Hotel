
import { httpStatusCodes } from "../constants/httpStatusCodes";



export abstract class AppError extends Error {
  abstract serialize(): {message:string}
  abstract statusCode: number;

  constructor(
   public message:string
  ) {
    super(message);
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, AppError.prototype);
    
  }
}

export class Api404Error extends AppError {
  constructor( message: string) {
    super(message || "Not Found");
    Object.setPrototypeOf(this, Api404Error.prototype);
  }
  statusCode = httpStatusCodes.NOT_FOUND;
  serialize() {
    return {
      message: this.message || "Not Found",
    };
  }
}

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message || "Bad Request");
    Object.setPrototypeOf(this, Api404Error.prototype);
  }
  statusCode = httpStatusCodes.BAD_REQUEST;
  serialize() {
    return {
      message: this.message || "Bad Request",
    };
  }
}


// Assuming developers mark known operational errors with error.isOperational=true
// process.on('uncaughtException', (error: Error) => {
//   errorManagement.handler.handleError(error);
//   if(!errorManagement.handler.isTrustedError(error))
//     process.exit(1)
// });