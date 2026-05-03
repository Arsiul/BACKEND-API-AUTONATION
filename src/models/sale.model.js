import { pool } from "../config/db.js"

export class SaleModel{

    static async getAll(){
        const [result] = await pool.query(
            `SELECT * FROM tb_venta`
        )
        return result;
    }
    static async create(){
        const newSale = await pool.query(
            `INSERT INTO tb_venta `
        )
    }
}