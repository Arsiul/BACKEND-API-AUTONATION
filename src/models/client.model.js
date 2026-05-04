import { pool } from "../config/db.js";

export class clientModel{

    static async getAll(){
        const [rows] = await pool.query("SELECT * FROM tb_cliente")
        return rows
    }

    static async Create(data){
        const newClient = await pool.query(
            `INSERT INTO tb_cliente(primer_nombre, segundo_nombre,primer_apellido,segundo_apellido,
            dni,telefono,correo,direccion,url_img) VALUES (?,?,?,?,?,?,?,?,?)`,
            [ data.primer_nombre, data.segundo_nombre ?? null, data.primer_apellido, data.segundo_apellido ?? null,
            data.dni, data.telefono, data.correo, data.direccion, data.url_img ]
        )
        return newClient;
    }

    static async Update(data,id){
        const updatedClient = await pool.query(
            `UPDATE tb_cliente SET primer_nombre = ?, segundo_nombre=?, primer_apellido=?, segundo_apellido=?,
            dni=?,telefono=?,correo=?,direccion=?,url_img=? WHERE id = ?`,
            [ data.primer_nombre, data.segundo_nombre ?? null, data.primer_apellido, data.segundo_apellido ?? null,
            data.dni, data.telefono, data.correo, data.direccion, data.url_img, id ]
        )
        return updatedClient;
    }
    
}