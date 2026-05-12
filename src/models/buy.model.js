import { pool } from "../config/db.js";

export class BuyModel{
    static async getAll(){
        const [result] = await pool.query(
            `SELECT tb1.id, tb1.serie, tb1.nro_comprobante, tb1.fecha_compra,tb1.subtotal, tb1.igv, tb1.total, tb1.id_moneda, tb1.id_estado_pago, tb1.id_proveedor, tb1.id_tipo_comprobante, tb2.ruc, tb2.razon_social, tb2.email, tb2.direccion, tb2.telefono FROM tb_compra tb1 INNER JOIN tb_proveedor tb2 ON (tb1.id_proveedor = tb2.id)`
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
    static async deleteBuy(id){
        const [result] = await pool.query(
            `DELETE FROM tb_compra WHERE id = ?`, [id]
        )

        return result;
    }
    static async findById(id){
        const [result] = await pool.query(
            `SELECT * FROM tb_compra WHERE id = ?`,[id]
        )
        return result[0]
    }
}