import { pool } from "../config/db.js";

export class UserModel{

    static async findById(id){

        const [result] = await pool.query(
            `SELECT * FROM tb_usuario WHERE id = ?`, [id]
        )
        return result[0];
    }
    static async findByDni(dni){
        const [result] = await pool.query(
            `SELECT * FROM tb_usuario WHERE dni = ?`, [dni] 
        )
        return result[0];
    }
    static async findByEmail(correo){
        const [result] = await pool.query(
            `SELECT * FROM tb_usuario WHERE correo = ?`, [correo] 
        )
        return result[0];
    }
    static async create({ primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, dni, correo, telefono, url_img, id_estado_usuario, id_rol, contrasena }){
        const [newUser] = await pool.query(
            `INSERT INTO tb_usuario(primer_nombre, segundo_nombre,primer_apellido,
            segundo_apellido,dni,correo,telefono,url_img,id_estado_usuario,id_rol,contrasena) 
            VALUES (?,?,?,?,?,?,?,?,?,?,?)`, [primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, dni, correo, telefono, url_img, id_estado_usuario, id_rol, contrasena]
        )
    }
    static async getAll(){
        const [result] = await pool.query(
            `SELECT id,primer_nombre,segundo_nombre,primer_apellido,
            segundo_apellido,dni,correo,telefono,url_img,id_estado_usuario,id_rol FROM tb_usuario`
        )
        return result;
    }
}