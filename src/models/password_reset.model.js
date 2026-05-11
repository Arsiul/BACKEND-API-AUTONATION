import { pool } from "../config/db.js";

export class PasswordResetModel {

  static async create({ user_id, code, expires_at }) {
    return await pool.query(
      `INSERT INTO tb_password_reset (user_id, code, expires_at, used)
       VALUES (?, ?, ?, 0)`,
      [user_id, code, expires_at]
    );
  }

  static async findValid(code) {
    const [rows] = await pool.query(
      `SELECT * FROM tb_password_reset
       WHERE code = ? AND used = 0 AND expires_at > DATE_SUB(UTC_TIMESTAMP(), INTERVAL 5 HOUR)`,
      [code]
    );

    return rows[0];
  }

  static async markUsed(id) {
    await pool.query(
      `UPDATE tb_password_reset SET used = 1 WHERE id = ?`,
      [id]
    );
  }
}