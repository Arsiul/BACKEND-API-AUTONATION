import { pool } from "../config/db.js"

export class SaleModel{

    static async getAll(){
        const [result] = await pool.query(
            `SELECT * FROM tb_venta`
        )
        return result;
    }
    // static async createSale(conn, { serie, nro_comprobante,subtotal,igv,total,id_estado_pago,id_cliente,id_tipo_comprobante,id_usuario }) {
    //     const [result] = await conn.query(
    // `INSERT INTO tb_venta 
    // (serie, nro_comprobante, fecha_venta, subtotal, igv, total,
    //  id_estado_pago, id_cliente, id_tipo_comprobante, id_usuario)
    //  VALUES (?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?)`,
    // [ serie,nro_comprobante,subtotal,igv,total,id_estado_pago,id_cliente,id_tipo_comprobante,id_usuario ]);
    //     return result.insertId; 
    // }

}