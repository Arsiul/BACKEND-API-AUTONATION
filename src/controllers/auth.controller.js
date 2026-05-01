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
}