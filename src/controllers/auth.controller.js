import { AuthService } from "../services/auth.service.js";
import { generateToken } from "../utils/jwt.util.js";

export class AuthController {


  static async register(req, res) {
    try {
      const user = await AuthService.register(req.body);

      res.status(201).json({
        message: "Usuario registrado correctamente"
      });

    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }


  static async login(req, res) {
  try {
    const result = await AuthService.login(req.body);

    res.json({
      message: "Login exitoso",
      ...result
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  }

    static async forgotPassword(req, res) {
    try {
      const { email } = req.body;

      await AuthService.requestPasswordReset(email);

      return res.json({
        message: "Si el correo existe, se enviará un código"
      });

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  static async verifyCode(req, res) {
    try {
      const { code } = req.body;

      const result = await AuthService.verifyCode(code);

      if (!result) {
        return res.status(400).json({
          message: "Código inválido o expirado"
        });
      }

      return res.json({ message: "Código válido" });

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  static async resetPassword(req, res) {
    try {
      const { code, newPassword } = req.body;

      const ok = await AuthService.resetPassword({
        code,
        newPassword,
      });

      if (!ok) {
        return res.status(400).json({
          message: "Código inválido"
        });
      }

      return res.json({
        message: "Contraseña actualizada correctamente"
      });

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}