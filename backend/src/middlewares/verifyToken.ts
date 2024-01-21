import { Request, Response, ErrorRequestHandler, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
   const token = req.cookies["auth_token"]
    if (!token) {
      return next();
    }

    const { decoded } = verifyJwt(token);
     if (decoded) {
       res.locals.user = decoded;
       return next();
     }

    return next()

    

   
};
export default verifyToken