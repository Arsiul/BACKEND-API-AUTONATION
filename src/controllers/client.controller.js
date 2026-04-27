import { clientModel } from "../models/client.model.js";

export class clientController{

    static async getAll(req,res){
        try {
            const data = await clientModel.getAll()
            if(data.length == 0){
                return res.status(200).json({
                    message: "No hay clientes registrados"
                })
            }
            else{
                res.status(200).json({
                    message: "Datos",
                    data
                })
            }
        } catch (error) {
            res.status(500).json({
                message: "Error en el servidor",
                error: error.message
            })
        }
    }
}