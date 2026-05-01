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
}