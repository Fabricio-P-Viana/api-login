import { Request, Response } from 'express';
import { registerService, loginService, forgotPasswordService, resetPasswordService, refreshTokenService } from '../services/authService';
import transporter from '../utils/nodemailer';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role = "user" } = req.body;

  try {
    const { token, refreshToken } = await registerService(name, email, password, role);
    res.status(201).json({ token, refreshToken });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { token, refreshToken } = await loginService(email, password);
    res.status(200).json({ token, refreshToken });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const { resetToken, email: userEmail } = await forgotPasswordService(email);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Password Reset',
      text: `You requested a password reset. Click the link to reset your password: http://localhost:3000/reset-password?token=${resetToken}`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  try {
    const user = await resetPasswordService(token, newPassword);
    res.status(200).json({ message: 'Password reset successful' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const { token } = req.body;
  
  try {
    const { token: newToken, refreshToken: newRefreshToken } = await refreshTokenService(token);
    res.status(200).json({ token: newToken, refreshToken: newRefreshToken });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};