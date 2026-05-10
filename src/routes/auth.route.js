import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { roleMiddleware } from "../middlewares/rol.middleware.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const authrouter = Router();

authrouter.post("/register",authMiddleware, roleMiddleware(1),AuthController.register);
authrouter.post("/login", AuthController.login);
authrouter.post("/forgot-password", AuthController.forgotPassword);
authrouter.post("/verify-code", AuthController.verifyCode);
authrouter.post("/reset-password", AuthController.resetPassword);

export default authrouter;