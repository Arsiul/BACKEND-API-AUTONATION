import { pool } from "../config/db.js";

export class BuyModel{
    static async getAll(){
        const [result] = await pool.query(
            `SELECT * FROM tb_compra`
    )
        return result;
    }
}