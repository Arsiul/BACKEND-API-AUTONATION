import { BuyModel } from "../models/buy.model.js";
// import { SaleService } from "../services/sale.service.js";

export class BuyController{
    
    static async getAll(req,res){
        try {
            const data = await BuyModel.getAll()
            if(data.length === 0){
                res.status(200).json({
                    message: "No hay compras registrados"
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

}