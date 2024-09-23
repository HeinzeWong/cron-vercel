/**
 * 发送邮件到指定邮箱
 */
import nodemailer from 'nodemailer';
import { emailConfig } from './const';

export async function sendEmail(
  to: string,
  subject: string,
  html: string
): Promise<void> {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  const transporter = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    secure: emailConfig.secure,
    auth: {
      // env.local的user
      user,
      pass,
    },
  });

  await transporter.sendMail({
    from: user,
    to,
    subject,
    html,
  });
}