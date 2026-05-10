import { Router } from "express";
import { roleMiddleware } from "../middlewares/rol.middleware.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { SaleController } from "../controllers/sale.controller.js";

const saleRouter = Router();

saleRouter.get("/getAll", authMiddleware, roleMiddleware(1,2), SaleController.getAll)
saleRouter.post("/register", authMiddleware, roleMiddleware(1,2), SaleController.create);
saleRouter.put("/update", authMiddleware, roleMiddleware(1,2), SaleController.update);

export default saleRouter;