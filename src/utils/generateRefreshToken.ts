import jwt from 'jsonwebtoken';

const generateRefreshToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '7d' });
};

export default generateRefreshToken;