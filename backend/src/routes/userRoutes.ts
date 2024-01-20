import express from 'express'
import validate from "../utils/validateResources";
import { register } from '../controllers/userController'
import {createUserSchema} from '../validations/userValidation'
import { signUpSignInLimiter } from '../middlewares/limiter';
const router = express.Router()

router.post(
  "/register",
    //signUpSignInLimiter,
    validate(createUserSchema),
  register
);

export default router