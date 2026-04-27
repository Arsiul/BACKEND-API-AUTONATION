import { clientController } from "../controllers/Client.controller.js";
import { Router } from "express";

const routerClient = Router()

routerClient.get("/getAll", clientController.getAll)

export default routerClient;