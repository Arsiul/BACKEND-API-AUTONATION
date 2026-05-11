import { BuyModel } from "../models/buy.model.js";
import { BuyService } from "../services/buy.service.js";

export class BuyController{
    static async getAll(req,res){
        try {
            const data = await BuyModel.getAll()
            if(data.length === 0){
                res.status(200).json({
                    message: "No hay compras registradas"
                });
            }else{
                return res.status(200).json(data);
            }
        } catch (error) {
            res.status(500).json({
                message: "Error Interno",
                error: error.message
            })
        }
    }

    static async create(req, res) {
        try {
            const result = await BuyService.createBuy(req.body);
            res.status(201).json({ message: "Compra registrada y stock actualizado", ...result });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const result = await BuyModel.update(id, req.body);
            if (result.affectedRows === 0) return res.status(404).json({ message: "Compra no encontrada" });
            res.status(200).json({ message: "Compra actualizada correctamente" });
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar", error: error.message });
        }
    }
}