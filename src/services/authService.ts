import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import generateToken from '../utils/generateToken';
import generateRefreshToken from '../utils/generateRefreshToken';

export const registerService = async (name: string, email: string, password: string, role: string) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('Email already in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword, role });

  const token = generateToken(user.id.toString());
  const refreshToken = generateRefreshToken(user.id.toString());

  return { token, refreshToken };
};

export const loginService = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user.id.toString());
  const refreshToken = generateRefreshToken(user.id.toString());

  return { token, refreshToken };
};

export const forgotPasswordService = async (email: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }

  const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

  return { resetToken, email: user.email };
};

export const resetPasswordService = async (token: string, newPassword: string) => {
  const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
  const user = await User.findByPk(decoded.id);
  if (!user) {
    throw new Error('Invalid token');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  return user;
};

export const refreshTokenService = async (token: string) => {
  const decoded: any = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
  const newToken = generateToken(decoded.id);
  const newRefreshToken = generateRefreshToken(decoded.id);

  return { token: newToken, refreshToken: newRefreshToken };
};
