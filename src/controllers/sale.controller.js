import { SaleModel } from "../models/sale.model.js";
import { SaleService } from "../services/sale.service.js";

export class SaleController{
    
    static async getAll(req,res){
        try {
            const data = await SaleModel.getAll()
            if(data.length === 0){
                res.status(200).json({
                    message: "No hay clientes registrados"
                })
            }else{
                return res.status(200).json(data)
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
      const result = await SaleService.createSale(req.body);

      return res.status(201).json({
        message: "Venta registrada correctamente",
        ...result
      });

    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
    }
}