import { Router } from "express";
import * as userControllers from "./user.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { loginSchema, signupSchema } from "./user.validations.js";

const router = Router();

router.post("/signup", validate(signupSchema), userControllers.signup);
router.post("/logIn", validate(loginSchema), userControllers.login);

export default router;
