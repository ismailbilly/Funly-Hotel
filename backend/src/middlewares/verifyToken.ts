import { Request, Response, ErrorRequestHandler, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
   const token = req.cookies["auth_token"]
  if (!token) {
       return res.status(401).json({ message: "unauthorized" });
      //return next();
    }

    const { decoded } = verifyJwt(token);
     if (decoded) {
     res.locals.userId = (decoded as JwtPayload).userId
       return next();
     }

    return res.status(401).json({ message: "unauthorized" });

    

   
};
export default verifyToken