import { UserModel } from "../models/user.model.js";

export class UserControiller{

    static async getAll(req,res){
        try {
            const data = await UserModel.getAll();
            res.status(200).json(data)
            
        } catch (error) {
            res.status(500).json({
                message: "Error Interno",
                error: error.message
            })
        }
    }
    static async findById(req,res){
        const id = req.params.id
        try {
            const user = await UserModel.findById(id)
            if(!user){
                return res.status(404).json({
                    message: "Usuario Inexistente"
                })
            }
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({
                message: "Error Interno"
            })
        }
    }
}