import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';

const adminOnlyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as AuthenticatedRequest).user;

  if (!user || user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  next();
};

export default adminOnlyMiddleware;