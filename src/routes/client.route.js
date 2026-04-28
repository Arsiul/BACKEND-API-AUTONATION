import { clientController } from "../controllers/Client.controller.js";
import { Router } from "express";

const routerClient = Router()

routerClient.get("/getAll", clientController.getAll)
routerClient.post("/register", clientController.Register)

export default routerClient;