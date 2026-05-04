import { pool } from "../config/db.js"

export class SaleModel{

    static async getAll(){
        const [result] = await pool.query(
            `SELECT * FROM tb_venta`
        )
        return result;
    }
    static async createSale(conn, data) {
        await conn.query(
        `INSERT INTO tb_venta 
        (id, serie, nro_comprobante, fecha_venta, subtotal, igv, total,
        id_estado_pago, id_cliente, id_tipo_comprobante, id_usuario)
        VALUES (?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?)`,
        [
            data.id,
            data.serie,
            data.nro_comprobante,
            data.subtotal,
            data.igv,
            data.total,
            data.id_estado_pago,
            data.id_cliente,
            data.id_tipo_comprobante,
            data.id_usuario
        ]
        );
    }

}