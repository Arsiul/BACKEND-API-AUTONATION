import { clientController } from "../controllers/client.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { clientSchema } from "../schemas/auth.schema.js";
import { roleMiddleware } from "../middlewares/rol.middleware.js";
import { Router } from "express";

const clientroute = Router()

clientroute.get("/getAll",roleMiddleware(1,2,3), clientController.getAll)
clientroute.post("/register", roleMiddleware(1,2,3),validateSchema(clientSchema),clientController.Register)

export default clientroute;