import { pool } from "../config/db.js";

export class BuyModel{
    static async getAll(){
        const [result] = await pool.query(
            `SELECT * FROM tb_compra`
        );
        return result;
    }

    static async createBuy(conn, data) {
        await conn.query (
            `INSERT INTO tb_compra
            (id, serie, nro_comprobante, fecha_compra, subtotal, igv, total,
            id_moneda, id_estado_pago, id_proveedor, id_tipo_comprobante)
            VALUES (?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?)`,
            [
                data.id, data.serie, data.nro_comprobante, data.subtotal,
                data.igv, data.total, data.id_moneda, data.id_estado_pago,
                data.id_proveedor, data.id_tipo_comprobante
            ]
        );
    }

    static async update(id, data) {
        const [result] = await pool.query(
            `UPDATE tb_compra SET
                serie = ?, nro_comprobante = ?, subtotal = ?, igv = ?, total = ?,
                id_moneda = ?, id_estado_pago = ?, id_proveedor = ?, id_tipo_comprobante = ?
            WHERE id = ?`,
            [
                data.serie, data.nro_comprobante, data.subtotal, data.igv, data.total,
                data.id_moneda, data.id_estado_pago, data.id_proveedor, data.id_tipo_comprobante,
                id
            ]
        );
        return result;
    }
}