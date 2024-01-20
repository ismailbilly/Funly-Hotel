import express from "express";
import validate from "../utils/validateResources";
import { login } from "../controllers/authController";
import { createLoginSchema } from "../validations/authValidation";

const router = express.Router();

router.post("/login", validate(createLoginSchema), login);

export default router;