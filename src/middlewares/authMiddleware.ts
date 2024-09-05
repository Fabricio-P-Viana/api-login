import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest'; // Certifique-se de que o caminho está correto

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Extrai o token do cabeçalho Authorization
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };

    // Define `req.user` convertendo o `req` para o tipo `AuthenticatedRequest`
    (req as AuthenticatedRequest).user = { id: decoded.id.toString(), role: 'user' }; // Ajuste `role` conforme necessário

    // Chama o próximo middleware ou controlador
    next();
  } catch (error) {
    // Retorna erro caso o token seja inválido
    res.status(401).json({ message: 'Not authenticated' });
  }
};

export default authMiddleware;
