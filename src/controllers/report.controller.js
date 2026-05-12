import { ReportModel } from "../models/report.model.js";

export class ReportController {

    static async getKpis(req, res) {
        try {
            const kpis = await ReportModel.getKpis();
            res.status(200).json(kpis);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener los KPIs", error: error.message });
        }
    }

    static async getVentasMensuales(req, res) {
        try {
            const data = await ReportModel.getVentasMensuales();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener las ventas mensuales", error: error.message });
        }
    }

    static async getActividadUsuarios(req, res) {
        try {
            const data = await ReportModel.getActividadUsuarios();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener la actividad de usuarios", error: error.message });
        }
    }

    static async getMetodosPago(req, res) {
        try {
            const data = await ReportModel.getMetodosPago();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener los métodos de pago", error: error.message });
        }
    }

    static async getEstadoEntregas(req, res) {
        try {
            const data = await ReportModel.getEstadoEntregas();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener el estado de entregas", error: error.message });
        }
    }

    static async getInventarioPorTipo(req, res) {
        try {
            const data = await ReportModel.getInventarioPorTipo();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener el inventario por tipo", error: error.message });
        }
    }

    static async getTopVendedores(req, res) {
        try {
            const data = await ReportModel.getTopVendedores();
            if (data.length === 0) {
                return res.status(200).json({ message: "No hay ventas registradas este mes" });
            }
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener el top de vendedores", error: error.message });
        }
    }
}