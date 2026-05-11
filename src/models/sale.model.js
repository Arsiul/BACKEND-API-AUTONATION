import { pool } from "../config/db.js"

export class SaleModel{

    static async getAll(){
        const [result] = await pool.query(
            `SELECT tb1.id,tb1.serie,tb1.nro_comprobante,tb1.fecha_venta,tb1.subtotal,tb1.igv,tb1.total,tb1.id_estado_pago,tb1.id_cliente,tb1.id_tipo_comprobante,tb1.id_usuario, tb2.id_vehiculo,
tb3.anio, tb3.precio_u, tb3.url_img 
FROM tb_venta tb1
INNER JOIN tb_detalle_venta tb2 ON (tb1.id = tb2.id_venta)
INNER JOIN tb_vehiculo tb3 ON (tb2.id_vehiculo = tb3.id) ORDER BY nro_comprobante DESC;`
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

    static async update(data,id){
            const updateSale = await pool.query(
            `UPDATE tb_venta 
            SET 
                serie = ?, 
                nro_comprobante = ?, 
                fecha_venta = ?, 
                subtotal = ?, 
                igv = ?, 
                total = ?,
                id_estado_pago = ?, 
                id_cliente = ?, 
                id_tipo_comprobante = ?, 
                id_usuario = ?
            WHERE id = ?`, 
                [
                data.serie,
                data.nro_comprobante,
                data.fecha_venta,
                data.subtotal,
                data.igv,
                data.total,
                data.id_estado_pago,
                data.id_cliente,
                data.id_tipo_comprobante,
                data.id_usuario,
                id
                ]
            )
            return updateSale;
    }

}