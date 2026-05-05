import { Router } from "express";
import { roleMiddleware } from "../middlewares/rol.middleware.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { BuyController } from "../controllers/buys.controller.js";

const buyRouter = Router();

buyRouter.get("/getAll", BuyController.getAll)
// buyRouter.post("/register", SaleController.create);

export default buyRouter;