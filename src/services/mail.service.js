import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export class MailService {
  static async sendMail({ to, subject, text }) {
    try {
      const data = await resend.emails.send({
  from: "onboarding@resend.dev",
  to: "report0361@gmail.com",
  subject,
  text,
});

console.log("📩 FULL RESPONSE:");
console.log(JSON.stringify(data, null, 2));

    } catch (error) {
      console.log("❌ ERROR EN EMAIL:", error);
      throw error;
    }
  }
}