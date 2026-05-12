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

    static async Update(req,res){
        const id = req.params.id
        const data = req.body

        try {
            const updatebuy = await BuyModel.update(data,id)
            console.log(data)
            res.status(200).json({
                message: "compra Actualizado"
            })

        } catch (error) {
            res.status(500).json({
                error: error.message
            })
        }
    }
    static async delete(req, res) {
            try {
                const id = req.params.id;
    
                const deleted = await BuyModel.deleteBuy(id);
    
                if (deleted.affectedRows === 0) {
                    return res.status(404).json({
                        message: "Compra no encontrado"
                    });
                }
    
                return res.status(200).json({
                    message: "Compra eliminada"
                });
    
            } catch (error) {
                return res.status(500).json({
                    message: "Error Interno",
                    error: error.message
                });
            }
        }
    static async findById(req, res) {
            try {
                const id = req.params.id;
    
                const data = await BuyModel.findById(id);
                return res.status(200).json(data)
    
            } catch (error) {
                return res.status(500).json({
                    message: "Error Interno",
                    error: error.message
                });
            }
        }
}