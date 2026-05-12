import { Router } from "express";
import { ReportController } from "../controllers/report.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/rol.middleware.js";

const reportRoute = Router();

// KPIs generales 
reportRoute.get("/kpis", authMiddleware, roleMiddleware(1, 2), ReportController.getKpis);

// Tab Ventas
reportRoute.get("/ventas-mensuales", authMiddleware, roleMiddleware(1, 2), ReportController.getVentasMensuales);
reportRoute.get("/actividad-usuarios", authMiddleware, roleMiddleware(1, 2), ReportController.getActividadUsuarios);

// Tab Pagos 
reportRoute.get("/metodos-pago", authMiddleware, roleMiddleware(1, 2), ReportController.getMetodosPago);
reportRoute.get("/estado-entregas", authMiddleware, roleMiddleware(1, 2), ReportController.getEstadoEntregas);

// Tab Inventario
reportRoute.get("/inventario-tipo", authMiddleware, roleMiddleware(1, 2), ReportController.getInventarioPorTipo);
reportRoute.get("/top-vendedores", authMiddleware, roleMiddleware(1, 2), ReportController.getTopVendedores);

export default reportRoute;