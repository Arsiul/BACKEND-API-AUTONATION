// import { pool } from "../config/db.js";
// import { SaleModel } from "../models/sale.model.js";

// export class VentaService {

//   static async crearVenta(data) {
//     const conn = await pool.getConnection();

//     try {

//       await conn.beginTransaction();

//       const ventaId = await SaleModel.createSale(conn, {
//         serie: data.serie,
//         nro_comprobante: data.nro_comprobante,
//         subtotal: data.subtotal,
//         igv: data.igv,
//         total: data.total,
//         id_estado_pago: data.id_estado_pago,
//         id_cliente: data.id_cliente,
//         id_tipo_comprobante: data.id_tipo_comprobante,
//         id_usuario: data.id_usuario
//       });

//       for (const item of data.vehiculos) {

//         const [rows] = await conn.query(
//           `SELECT stock FROM tb_vehiculo WHERE id = ?`,
//           [item.id_vehiculo]
//         );

//         const vehiculo = rows[0];

//         if (!vehiculo) {
//           throw new Error(`Vehículo ${item.id_vehiculo} no existe`);
//         }

//         if (vehiculo.stock < item.cantidad) {
//           throw new Error(`Stock insuficiente para vehículo ${item.id_vehiculo}`);
//         }

//         // 🧾 3.2 INSERTAR DETALLE
//         await conn.query(
//           `INSERT INTO tb_detalle_venta 
//           (venta_id, vehiculo_id, cantidad, precio)
//           VALUES (?, ?, ?, ?)`,
//           [
//             ventaId,
//             item.vehiculoId,
//             item.cantidad,
//             item.precio
//           ]
//         );

//         // 📉 3.3 DESCONTAR STOCK
//         await conn.query(
//           `UPDATE tb_vehiculo
//            SET stock = stock - ?
//            WHERE id = ?`,
//           [item.cantidad, item.vehiculoId]
//         );
//       }

//       // ✅ 4. CONFIRMAR TODO
//       await conn.commit();
//       conn.release();

//       return {
//         success: true,
//         ventaId
//       };

//     } catch (error) {

//       // ❌ 5. ROLLBACK SI FALLA ALGO
//       await conn.rollback();
//       conn.release();

//       throw error;
//     }
//   }
// }