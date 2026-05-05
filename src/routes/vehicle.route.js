import { Router } from "express";
import { VehicleController } from  "../controllers/vehicle.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/rol.middleware.js";
import { vehicleSchema } from "../schemas/vehicle.schema.js";
import { validateSchema } from "../middlewares/validate.middleware.js";

const vehicleroute = Router();

vehicleroute.get("/", authMiddleware, roleMiddleware(1, 2, 3), VehicleController.getAll);
vehicleroute.post("/", authMiddleware, roleMiddleware(1), validateSchema(vehicleSchema), VehicleController.create);
vehicleroute.put("/:id", authMiddleware, roleMiddleware(1), validateSchema(vehicleSchema), VehicleController.update);

export default vehicleroute;