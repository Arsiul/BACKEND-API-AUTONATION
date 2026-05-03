import { Router } from "express";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { UserController } from "../controllers/user.controller.js";
import { userSchema } from "../schemas/auth.schema.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/rol.middleware.js";


const userrouter = Router()

userrouter.get("/getAll", authMiddleware, roleMiddleware(1),UserController.getAll)



export default userrouter;