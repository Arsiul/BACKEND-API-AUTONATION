import { pool } from "../config/db.js";
import { SaleModel } from "../models/sale.model.js";
import { v4 as uuidv4 } from "uuid";

export class SaleService {

  static async createSale(data) {
    const conn = await pool.getConnection();

    try {
      await conn.beginTransaction();

      // 🔥 1. Generar UUID
      const ventaId = uuidv4();

      // 🔥 2. Crear venta
      await SaleModel.createSale(conn, {
        id: ventaId,
        serie: data.serie,
        nro_comprobante: data.nro_comprobante,
        subtotal: data.subtotal,
        igv: data.igv,
        total: data.total,
        id_estado_pago: data.id_estado_pago,
        id_cliente: data.id_cliente,
        id_tipo_comprobante: data.id_tipo_comprobante,
        id_usuario: data.id_usuario
      });

      // 🔥 3. Insertar detalle + validar stock
      for (const item of data.vehiculos) {

        // Obtener stock
        const [rows] = await conn.query(
          `SELECT stock FROM tb_vehiculo WHERE id = ?`,
          [item.id_vehiculo]
        );

        const vehiculo = rows[0];

        if (!vehiculo) {
          throw new Error(`Vehículo ${item.id_vehiculo} no existe`);
        }

        if (vehiculo.stock < item.cantidad) {
          throw new Error(`Stock insuficiente para vehículo ${item.id_vehiculo}`);
        }

        // Insertar detalle
        await conn.query(
          `INSERT INTO tb_detalle_venta 
          (cantidad, subtotal, id_venta, id_vehiculo)
          VALUES (?, ?, ?, ?)`,
          [
            item.cantidad,
            item.subtotal,
            ventaId
          , item.id_vehiculo]
        );

        const [result] = await conn.query(
          `UPDATE tb_vehiculo
           SET stock = stock - ?
           WHERE id = ? AND stock >= ?`,
          [item.cantidad, item.id_vehiculo, item.cantidad]
        );

        if (result.affectedRows === 0) {
          throw new Error(`Stock insuficiente para vehículo ${item.id_vehiculo}`);
        }
      }

      // 🔥 4. Commit
      await conn.commit();
      conn.release();

      return {
        success: true,
        ventaId
      };

    } catch (error) {
      await conn.rollback();
      conn.release();
      throw error;
    }
  }
}