import bcrypt from "bcrypt";
import { UserModel } from "../models/user.model.js";
import { generateToken } from "../utils/jwt.util.js"

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

  return {
    token,
    user: safeUser
  };
}
}