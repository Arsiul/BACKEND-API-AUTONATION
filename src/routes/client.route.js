import { clientController } from "../controllers/client.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { clientSchema } from "../schemas/auth.schema.js";
import { roleMiddleware } from "../middlewares/rol.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { Router } from "express";

const clientroute = Router()

clientroute.get("/getAll",authMiddleware,roleMiddleware(1,2,3), clientController.getAll)
clientroute.post("/register", authMiddleware,roleMiddleware(1,2,3),validateSchema(clientSchema),clientController.Register)

export default clientroute;