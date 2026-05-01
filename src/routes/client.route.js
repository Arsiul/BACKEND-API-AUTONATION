import { clientController } from "../controllers/client.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { clientSchema } from "../schemas/auth.schema.js";
import { Router } from "express";

const clientroute = Router()

clientroute.get("/getAll", clientController.getAll)
clientroute.post("/register", validateSchema(clientSchema),clientController.Register)

export default clientroute;