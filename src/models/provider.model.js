import { pool } from "../config/db.js";

export class ProviderModel{

    static async getAll(){
        const [rows] = await pool.query("SELECT * FROM tb_proveedor")
        return rows
    }
    static async Create(data){
            const newProvider = await pool.query(
                `INSERT INTO tb_proveedor(razon_social, ruc,telefono,email,direccion,id_estado) VALUES (?,?,?,?,?,?)`,
                [ data.razon_social, data.ruc, data.telefono, data.email , data.direccion, data.id_estado]
            )
            return newProvider;
        }
    
    static async Update(data,id){
            const updateProvider = await pool.query(
                `UPDATE tb_proveedor SET razon_social = ?, ruc=?, telefono=?, email=?,
                direccion=?,id_estado=? WHERE id = ?`,
                [ data.razon_social, data.ruc, data.telefono, data.email , data.direccion, data.id_estado]
            )
            return updateProvider;
        }
        
    static async findByRuc(ruc){
            const [result] = await pool.query(
                `SELECT * FROM tb_proveedor WHERE ruc = ?`,[ruc]
            )
            return result[0]
        }
    static async findByCorreo(correo){
            const [result] = await pool.query(
                `SELECT * FROM tb_proveedor WHERE email = ?`,[correo]
            )
            return result[0]
        }
}