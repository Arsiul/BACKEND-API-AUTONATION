import { pool } from "../config/db.js";

export class clientModel{

    static async getAll(){
        const [rows] = await pool.query("SELECT * FROM tb_cliente")
        return rows
    }
    
}