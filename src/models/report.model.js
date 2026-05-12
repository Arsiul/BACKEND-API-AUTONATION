import { pool } from "../config/db.js";

export class ReportModel {

    // ─── TARJETAS KPI ───────────────────────────────────────────────

    static async getKpis() {
        // Ventas totales (suma de todos los totales de tb_venta)
        const [[ventasTotales]] = await pool.query(`
            SELECT COALESCE(SUM(total), 0) AS ventas_totales
            FROM tb_venta
        `);

        // Vehículos vendidos (suma de cantidades en tb_detalle_venta)
        const [[vehiculosVendidos]] = await pool.query(`
            SELECT COALESCE(SUM(cantidad), 0) AS vehiculos_vendidos
            FROM tb_detalle_venta
        `);

        // Total de clientes registrados
        const [[totalClientes]] = await pool.query(`
            SELECT COUNT(*) AS nuevos_clientes
            FROM tb_cliente
        `);

        return {
            ventas_totales: ventasTotales.ventas_totales,
            vehiculos_vendidos: vehiculosVendidos.vehiculos_vendidos,
            nuevos_clientes: totalClientes.nuevos_clientes,
        };
    }

    // ─── TAB VENTAS ─────────────────────────────────────────────────

    // Ventas mensuales del año actual agrupadas por mes
    static async getVentasMensuales() {
        const [rows] = await pool.query(`
            SELECT 
                MONTH(fecha_venta)   AS mes_numero,
                SUM(total)           AS total_ventas
            FROM tb_venta
            WHERE YEAR(fecha_venta) = YEAR(CURDATE())
            GROUP BY MONTH(fecha_venta)
            ORDER BY MONTH(fecha_venta) ASC
        `);
        return rows;
    }

    // Actividad de usuarios: cantidad de ventas registradas por mes en el año actual
    static async getActividadUsuarios() {
        const [rows] = await pool.query(`
            SELECT 
                MONTH(fecha_venta)  AS mes_numero,
                COUNT(*)            AS total_actividad
            FROM tb_venta
            WHERE YEAR(fecha_venta) = YEAR(CURDATE())
            GROUP BY MONTH(fecha_venta)
            ORDER BY MONTH(fecha_venta) ASC
        `);
        return rows;
    }

    // ─── TAB PAGOS ──────────────────────────────────────────────────

    // Métodos de pago: conteo de pagos de ventas agrupados por método
    static async getMetodosPago() {
        const [rows] = await pool.query(`
            SELECT 
                mp.metodo,
                COUNT(pv.id) AS total
            FROM tb_metodo_pago mp
            LEFT JOIN tb_pago_venta pv ON mp.id = pv.id_metodo_pago
            GROUP BY mp.id, mp.metodo
            ORDER BY mp.id ASC
        `);
        return rows;
    }

    // Estado de entregas: conteo agrupado por estado
    static async getEstadoEntregas() {
        const [rows] = await pool.query(`
            SELECT 
                ee.estado_entrega,
                COUNT(e.id) AS total
            FROM tb_estado_entrega ee
            LEFT JOIN tb_entrega e ON ee.id = e.id_estado_entrega
            GROUP BY ee.id, ee.estado_entrega
            ORDER BY ee.id ASC
        `);
        return rows;
    }

    // ─── TAB INVENTARIO ─────────────────────────────────────────────

    // Inventario de autos por tipo: separado en Nuevos vs Usados (Seminuevo + Usado)
    static async getInventarioPorTipo() {
        const [rows] = await pool.query(`
            SELECT 
                tv.tipo_vehiculo,
                SUM(CASE WHEN ev.estado_vehiculo = 'Nuevo' THEN v.stock ELSE 0 END)                         AS nuevos,
                SUM(CASE WHEN ev.estado_vehiculo IN ('Seminuevo', 'Usado') THEN v.stock ELSE 0 END)         AS usados
            FROM tb_vehiculo v
            JOIN tb_tipo_vehiculo tv ON v.id_tipo_vehiculo = tv.id
            JOIN tb_estado_vehiculo ev ON v.id_estado_vehiculo = ev.id
            GROUP BY tv.id, tv.tipo_vehiculo
            ORDER BY tv.id ASC
        `);
        return rows;
    }

    // Top vendedores del mes actual: usuarios ordenados por cantidad de ventas
    static async getTopVendedores() {
        const [rows] = await pool.query(`
            SELECT 
                CONCAT(u.primer_nombre, ' ', u.primer_apellido) AS vendedor,
                COUNT(v.id)                                      AS total_ventas
            FROM tb_usuario u
            JOIN tb_venta v ON u.id = v.id_usuario
            WHERE 
                MONTH(v.fecha_venta) = MONTH(CURDATE())
                AND YEAR(v.fecha_venta) = YEAR(CURDATE())
            GROUP BY u.id, u.primer_nombre, u.primer_apellido
            ORDER BY total_ventas DESC
            LIMIT 5
        `);
        return rows;
    }
}