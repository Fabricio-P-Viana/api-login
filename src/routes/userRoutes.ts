import { Router } from 'express';
import { createUser, getAllUsers, getUserProfile, updateUserProfile, deleteUser } from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';

const router = Router();

router.post('/', createUser);
router.get('/', authMiddleware, getAllUsers);

router.get('/profile', authMiddleware, (req, res) => {
  const authenticatedReq: AuthenticatedRequest = req as AuthenticatedRequest;
  return getUserProfile(authenticatedReq, res);
});

router.put('/profile', authMiddleware, (req, res) => {
  const authenticatedReq: AuthenticatedRequest = req as AuthenticatedRequest;
  return updateUserProfile(authenticatedReq, res);
});

router.delete('/profile', authMiddleware, (req, res) => {
  const authenticatedReq: AuthenticatedRequest = req as AuthenticatedRequest;
  return deleteUser(authenticatedReq, res);
});

export default router;