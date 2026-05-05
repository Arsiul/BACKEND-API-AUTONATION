import { pool } from "../config/db.js";

export class VehicleModel {
    static async getAll() {
        const [rows] = await pool.query(`
        SELECT 
            v.id, v.anio, v.color, v.precio_u, v.stock, v.tipo_combustible, 
            v.transmision, v.kilometraje, v.nro_puertas, v.url_img,
            v.id_modelo, v.id_tipo_vehiculo, v.id_estado_vehiculo, v.id_estado_vehiculo_venta, ma.id AS id_marca,
            m.modelo, 
            ma.marca, 
            tv.tipo_vehiculo, 
            ev.estado_vehiculo, 
            evv.estado_vehiculo_venta
        FROM tb_vehiculo v
        JOIN tb_modelo m ON v.id_modelo = m.id
        JOIN tb_marca ma ON m.id_marca = ma.id
        JOIN tb_tipo_vehiculo tv ON v.id_tipo_vehiculo = tv.id
        JOIN tb_estado_vehiculo ev ON v.id_estado_vehiculo = ev.id
        JOIN tb_estado_vehiculo_venta evv ON v.id_estado_vehiculo_venta = evv.id
        `);
        return rows;
    }

    static async create(data) {
        const [result] = await pool.query(
            'INSERT INTO tb_vehiculo (anio, color, precio_u, stock, tipo_combustible, transmision, kilometraje, nro_puertas, url_img, id_estado_vehiculo, id_estado_vehiculo_venta, id_modelo, id_tipo_vehiculo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                data.anio, data.color, data.precio_u, data.stock, data.tipo_combustible, data.transmision, data.kilometraje, data.nro_puertas, data.url_img, data.id_estado_vehiculo, data.id_estado_vehiculo_venta, data.id_modelo, data.id_tipo_vehiculo
            ]
        );
        return result;
    }

    static async update(id, data) {
        const [result] = await pool.query(
            `UPDATE tb_vehiculo SET 
                anio = ?, 
                color = ?, 
                precio_u = ?, 
                stock = ?, 
                tipo_combustible = ?, 
                transmision = ?, 
                kilometraje = ?, 
                nro_puertas = ?, 
                url_img = ?, 
                id_estado_vehiculo = ?, 
                id_estado_vehiculo_venta = ?, 
                id_modelo = ?, 
                id_tipo_vehiculo = ?
            WHERE id = ?`,
            [
                data.anio, 
                data.color, 
                data.precio_u, 
                data.stock, 
                data.tipo_combustible,
                data.transmision, 
                data.kilometraje, 
                data.nro_puertas, 
                data.url_img,
                data.id_estado_vehiculo, 
                data.id_estado_vehiculo_venta, 
                data.id_modelo, 
                data.id_tipo_vehiculo,
                id
            ]
        );
        return result;
    }
}