import nodemailer from "nodemailer";

export class MailService {
  static transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,

    family: 4, // 👈 FORZAR IPv4 (SOLUCIÓN CLAVE)

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  static async sendMail({ to, subject, text }) {
    try {
      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
      });

      console.log("📩 Email enviado correctamente");
      console.log("🆔 Message ID:", info.messageId);

      return info;

    } catch (error) {
      console.log("❌ ERROR EN ENVÍO DE CORREO:");
      console.log(error);

      throw error;
    }
  }
}