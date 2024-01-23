import express from "express";
import validate from "../utils/validateResources";
import { authHandle, login, logout } from "../controllers/authController";
import { createLoginSchema } from "../validations/authValidation";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();

router.post("/login", validate(createLoginSchema), login);

router.get("/validate-token", verifyToken, authHandle);
;

router.post("/logout", logout)
export default router;