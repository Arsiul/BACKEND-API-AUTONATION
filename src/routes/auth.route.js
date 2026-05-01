import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";

const authrouter = Router();

authrouter.post("/register", AuthController.register);
authrouter.post("/login", AuthController.login);

export default authrouter;