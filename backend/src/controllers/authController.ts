import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user"
import { CreateLoginInput } from "../validations/authValidation";
import  logger  from "../utils/logger";
import { Api404Error, BadRequestError } from "../utils/error";
import { signJwt } from "../utils/jwt";


export const login = async (req: Request<{}, {}, CreateLoginInput["body"]>, res: Response,next:NextFunction)=> {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
          throw new BadRequestError(`User with id: ${req.body.email} not found.`);
          //return res.status(401).send("Invalid email or password");
        }
        
  const isValid = await user.comparePassword(req.body.password);

        if (!isValid) return res.status(401).send("Invalid email or password");
        const token = signJwt(
          { userId: user._id },
          process.env.JWT_SECRET_KEY as string,
          { expiresIn: process.env.JWT_EXPIRES as string }
        );
        res.cookie("auth_token", token,{
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: process.env.COOKIE_MAX_AGE as any,
        });
       
        
        res.status(200).send({userId: user._id})
    } catch (error: any) {
       logger.error(error)
      return next(error)
    }
}

export const authHandle = (req: Request, res: Response) => {
  res.status(200).send({ userId: res.locals.userId })


}

export const logout =  (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.send();
}