import { ProviderController } from "../controllers/provider.controller.js";
import { roleMiddleware } from "../middlewares/rol.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { Router } from "express";

const providerRoute = Router()

providerRoute.get("/getAll", authMiddleware, roleMiddleware(1), ProviderController.getAll)
providerRoute.post("/register", authMiddleware, roleMiddleware(1), ProviderController.Register)
providerRoute.put("/update/:id", authMiddleware, roleMiddleware(1), ProviderController.Update)

export default providerRoute;