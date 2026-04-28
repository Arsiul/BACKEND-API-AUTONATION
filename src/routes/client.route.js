import { clientController } from "../controllers/Client.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { clientSchema } from "../schemas/auth.schema.js";
import { Router } from "express";

const routerClient = Router()

routerClient.get("/getAll", clientController.getAll)
routerClient.post("/register", validateSchema(clientSchema),clientController.Register)

export default routerClient;