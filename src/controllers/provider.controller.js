import { ProviderModel } from "../models/provider.model.js";

export class ProviderController{

    static async getAll(req,res){
        try {
            const data = await ProviderModel.getAll()
            if(data.length === 0){
                return res.status(200).json({
                    message: "No hay proveedores registrados"
                })
            }
            else{
                res.status(200).json(data)
            }
        } catch (error) {
            res.status(500).json({
                message: "Error en el servidor",
                error: error.message
            })
        }
    }
    static async Register(req,res){

        const data = req.body
        
        try {
            const existruc = await ProviderModel.findByRuc(data.ruc)
            const existcorreo = await ProviderModel.findByCorreo(data.correo)
            if (existruc){
                return res.status(409).json({
                    message: "RUC ya registrado"
                })
            }
            if(existcorreo){
                return res.status(409).json({
                    message: "Correo ya registrado"
            })
            }
            const newProvider = await ProviderModel.Create(data)
            res.status(201).json({
                message: "Nuevo Proveedor Registrado"
            })

        } catch (error) {
            res.status(500).json({
                error: error.message
            })
        }
    }
    static async Update(req,res){
        const id = req.params.id
        const data = req.body

        try {
            const updateProvider = await ProviderModel.Update(data,id)
            res.status(200).json({
                message: "Proveedor Actualizado"
            })

        } catch (error) {
            res.status(500).json({
                error: error.message
            })
        }
    }
}