import { pool } from "../config/db.js"

export class SaleModel{

    static async getAll(){
    const [result] = await pool.query(`
        SELECT tb1.id,tb1.serie,tb1.nro_comprobante,tb1.fecha_venta,
        tb1.subtotal,tb1.igv,tb1.total,tb1.id_estado_pago,
        tb1.id_cliente,tb1.id_tipo_comprobante,tb1.id_usuario,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id_vehiculo',tb3.id,
                'anio',tb3.anio,
                'precio_u',tb3.precio_u,
                'url_img',tb3.url_img
            )
        ) AS vehiculos
        FROM tb_venta tb1
        INNER JOIN tb_detalle_venta tb2 ON tb1.id = tb2.id_venta
        INNER JOIN tb_vehiculo tb3 ON tb2.id_vehiculo = tb3.id
        GROUP BY tb1.id,tb1.serie,tb1.nro_comprobante,tb1.fecha_venta,
        tb1.subtotal,tb1.igv,tb1.total,tb1.id_estado_pago,
        tb1.id_cliente,tb1.id_tipo_comprobante,tb1.id_usuario
        ORDER BY tb1.nro_comprobante DESC;
    `)

    return result
    }
    static async getAllByUser(id){
        const [result] = await pool.query(`
            SELECT tb1.id,tb1.serie,tb1.nro_comprobante,tb1.fecha_venta,
            tb1.subtotal,tb1.igv,tb1.total,tb1.id_estado_pago,
            tb1.id_cliente,tb1.id_tipo_comprobante,tb1.id_usuario,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id_vehiculo',tb3.id,
                    'anio',tb3.anio,
                    'precio_u',tb3.precio_u,
                    'url_img',tb3.url_img
                )
            ) AS vehiculos
            FROM tb_venta tb1
            INNER JOIN tb_detalle_venta tb2 ON tb1.id = tb2.id_venta
            INNER JOIN tb_vehiculo tb3 ON tb2.id_vehiculo = tb3.id WHERE tb1.id_usuario = ? 
            GROUP BY tb1.id,tb1.serie,tb1.nro_comprobante,tb1.fecha_venta,
            tb1.subtotal,tb1.igv,tb1.total,tb1.id_estado_pago,
            tb1.id_cliente,tb1.id_tipo_comprobante,tb1.id_usuario
            ORDER BY tb1.nro_comprobante DESC;
        `, [id])

        return result
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
                id_cliente = ? , 
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
                data.id_cliente ?? "15497944-483f-11f1-9882-a2aa326f9672",
                data.id_tipo_comprobante,
                data.id_usuario ?? "597d5cce-4c24-11f1-9882-a2aa326f9672",
                id
                ]
            )
            return updateSale;
    }

    static async findById(id){
        const [result] = await pool.query(
            `            SELECT tb1.id,tb1.serie,tb1.nro_comprobante,tb1.fecha_venta,
            tb1.subtotal,tb1.igv,tb1.total,tb1.id_estado_pago,
            tb1.id_cliente,tb1.id_tipo_comprobante,tb1.id_usuario,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id_vehiculo',tb3.id,
                    'anio',tb3.anio,
                    'precio_u',tb3.precio_u,
                    'url_img',tb3.url_img
                )
            ) AS vehiculos
            FROM tb_venta tb1
            INNER JOIN tb_detalle_venta tb2 ON tb1.id = tb2.id_venta
            INNER JOIN tb_vehiculo tb3 ON tb2.id_vehiculo = tb3.id WHERE tb1.id = ? 
            GROUP BY tb1.id,tb1.serie,tb1.nro_comprobante,tb1.fecha_venta,
            tb1.subtotal,tb1.igv,tb1.total,tb1.id_estado_pago,
            tb1.id_cliente,tb1.id_tipo_comprobante,tb1.id_usuario
            ORDER BY tb1.nro_comprobante DESC`,[id]
        )
        return result[0]
    }

}