import bcrypt from "bcrypt";
import { UserModel } from "../models/user.model.js";
import { generateToken } from "../utils/jwt.util.js"
import { pool } from "../config/db.js";
import { CodeUtil } from "../utils/generatecode.util.js";
import { MailService } from "./mail.service.js";
import { PasswordResetModel } from "../models/password_reset.model.js";

export class AuthService {

  static async register({ primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, dni, correo, telefono, url_img, id_estado_usuario, id_rol, contrasena }) {
    const existdni = await UserModel.findByDni(dni);
    const existemail = await UserModel.findByEmail(correo);

    if (existdni) throw new Error("DNI ya registrado");
    if (existemail) throw new Error("Correo ya registrado");

    const hashed = await bcrypt.hash(contrasena, 10);
    return await UserModel.create({
      primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, dni, correo, telefono, url_img, id_estado_usuario, id_rol,
      contrasena: hashed
    });
  }

  static async login({ correo, contrasena }) {
    const user = await UserModel.findByEmail(correo);

    if (!user) throw new Error("Credenciales inválidas");

    const valid = await bcrypt.compare(contrasena, user.contrasena);
    if (!valid) throw new Error("Credenciales inválidas");

    const { contrasena: _, ...safeUser } = user;
    const token = generateToken(user);
    console.log("id_rol: ", user.id_rol)

    return {
      token,
      user: safeUser
    };
  }

  static async requestPasswordReset(user) {
    const code = Math.floor(100000 + Math.random() * 900000);

    // guardar en BD (tu lógica ya la tienes)
    await PasswordResetModel.create({
      user_id: user.id,
      code,
      expires_at: new Date(Date.now() + 10 * 60 * 1000),
    });

    // enviar correo
    await MailService.sendMail({
      to: user.correo,
      subject: "Reset Password",
      text: `Tu código es: ${code}`,
    });

    return true;
  }

  static async verifyCode(code) {
    return await PasswordResetModel.findValid(code);
  }

  static async resetPassword({ code, newPassword }) {
    const record = await PasswordResetModel.findValid(code);

    if (!record) return false;

    const hashed = await bcrypt.hash(newPassword, 10);

    await pool.query(
      "UPDATE tb_usuario SET contrasena = ? WHERE id = ?",
      [hashed, record.user_id]
    );

    await PasswordResetModel.markUsed(record.id);

    return true;
  }
}