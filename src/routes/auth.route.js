import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { roleMiddleware } from "../middlewares/rol.middleware.js"

const authrouter = Router();

authrouter.post("/register", roleMiddleware(1),AuthController.register);
authrouter.post("/login", AuthController.login);

export default authrouter;