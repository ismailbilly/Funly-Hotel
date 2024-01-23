import { NextFunction, Request, Response } from "express";
import { CreateUserInput } from "../validations/userValidation";
import UserModel from "../models/user"

import { signJwt } from "../utils/jwt";
import logger from "../utils/logger";
import { Api404Error, BadRequestError } from "../utils/error";

export const register = async (req: Request<{}, {}, CreateUserInput["body"]>, res: Response, next:NextFunction) => {
    
    try {
        let user = await UserModel.findOne({
          email: req.body.email,
        });
      if (user) {
          next(new BadRequestError("User already exists"));
            //return res.status(400).json({message: "User already exists"})
        }
      user = new UserModel(req.body);
      
      const newUser = await user.save()
      console.log(newUser);
      if (newUser) {
         const token = signJwt(
           { userId: newUser._id },
           process.env.JWT_SECRET_KEY as string,
           { expiresIn: process.env.JWT_EXPIRES as string }
         );
       console.log('====================================');
       console.log(token);
       console.log('====================================');
         res.cookie("auth_token", token, {
           httpOnly: true,
           secure: process.env.NODE_ENV === "production",
           maxAge: process.env.COOKIE_MAX_AGE as any
         });
         return res.status(201).send({ message: "User registered" });
      }
     
    } catch (error: any) {
      logger.error(error)
      next(error)
      //res.status(error.statusCode).send(error.name);
     
    }
}