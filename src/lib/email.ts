import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SENDER_SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_SENDER_SMTP_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.EMAIL_SENDER_SMTP_USER,
    pass: process.env.EMAIL_SENDER_SMTP_PASS,
  },
});

export async function sendOTPEmail(email: string, otp: string): Promise<void> {
  const mailOptions = {
    from: process.env.EMAIL_SENDER_SMTP_FROM || '"Prime Bank" <noreply@primebank.com>',
    to: email,
    subject: 'Password Reset OTP',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Password Reset Request</h2>
        <p>Your OTP for password reset is:</p>
        <h1 style="color: #4F46E5; font-size: 32px; letter-spacing: 4px;">${otp}</h1>
        <p>This OTP will expire in 10 minutes.</p>
        <p>If you didn't request a password reset, please ignore this email.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendVerificationEmail(email: string, verificationLink: string, name: string): Promise<void> {
  const mailOptions = {
    from: process.env.EMAIL_SENDER_SMTP_FROM || '"Prime Bank" <noreply@primebank.com>',
    to: email,
    subject: 'Verify Your Email - Prime Bank',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4F46E5;">Welcome to Prime Bank, ${name}!</h2>
        <p>Thank you for registering. Please verify your email address to activate your account.</p>
        <div style="margin: 30px 0; text-align: center;">
          <a href="${verificationLink}" style="background-color: #4F46E5; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Verify Email
          </a>
        </div>
        <p style="color: #666; font-size: 14px;">
          Or copy and paste this link in your browser:<br>
          ${verificationLink}
        </p>
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          This link will expire in 24 hours. If you didn't register, please ignore this email.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}