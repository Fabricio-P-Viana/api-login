import bcrypt from 'bcryptjs';
import { User } from '../models/User';

export const createUserService = async (name: string, email: string, password: string, role: string = "user") => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('Email already in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword, role });

  return user;
};

export const getAllUsersService = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

export const getUserProfileService = async (userId: string) => {
  const user = await User.findByPk(userId, {
    attributes: { exclude: ['password'] }
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

export const updateUserProfileService = async (userId: string, name: string, email: string) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error('User not found');
  }

  user.name = name || user.name;
  user.email = email || user.email;
  await user.save();

  return user;
};

export const deleteUserService = async (userId: string) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error('User not found');
  }

  await user.destroy();
  return { message: 'User deleted successfully' };
};