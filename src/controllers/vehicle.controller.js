import { VehicleModel } from '../models/vehicle.model.js';

export class VehicleController {
    static async getAll(req, res) {
        try {
            const vehicles = await VehicleModel.getAll();
            if (vehicles.length === 0) {
                return res.status(200).json({ message: "No hay vehículos registrados" });
            } else {
                res.status(200).json(vehicles);
            }
        } catch (error) {
            res.status(500).json({ message: "Error al obtener los vehículos", error: error.message });
        }
    }

    static async create(req, res) {
        try {
            await VehicleModel.create(req.body);
            res.status(201).json({ message: "Vehículo registrado exitosamente en el inventario"});
        } catch (error) {
            res.status(500).json({ message: "Error al registrar vehículo", error: error.message });
        }
    }
}