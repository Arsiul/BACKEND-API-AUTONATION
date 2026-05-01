import { Router } from "express";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { UserControiller } from "../controllers/user.controller.js";
import { userSchema } from "../schemas/auth.schema.js";


const userrouter = Router()

userrouter.get("/getAll", UserControiller.getAll)



export default userrouter;