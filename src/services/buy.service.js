import { pool } from "../config/db.js";
import { BuyModel } from "../models/buy.model.js";
import { v4 as uuidv4 } from "uuid";

export class BuyService {
  static async createBuy(data) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      const compraId = uuidv4();

      // 1. Crear compra
      await BuyModel.createBuy(conn, {
        id: compraId,
        ...data
      });

      // 2. Procesar detalles y actualizar stock
      for (const item of data.vehiculos) {
        // Insertar en tb_detalle_compra
        await conn.query(
          `INSERT INTO tb_detalle_compra (cantidad, subtotal, id_compra, id_vehiculo)
           VALUES (?, ?, ?, ?)`,
          [item.cantidad, item.subtotal, compraId, item.id_vehiculo]
        );

        // Aumentar el stock del vehículo
        await conn.query(
          `UPDATE tb_vehiculo SET stock = stock + ? WHERE id = ?`,
          [item.cantidad, item.id_vehiculo]
        );
      }

      await conn.commit();
      return { success: true, compraId };
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }
}