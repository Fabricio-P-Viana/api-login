import { Router } from 'express';
import { createUser, getAllUsers, getUserProfile, updateUserProfile, deleteUser } from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';

const router = Router();

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', createUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retorna uma lista de usuários
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Erro no servidor
 */
router.get('/', authMiddleware, getAllUsers);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Retorna o perfil do usuário autenticado
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil do usuário obtido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       401:
 *         description: Não autorizado
 */
router.get('/profile', authMiddleware, (req, res) => {
  const authenticatedReq: AuthenticatedRequest = req as AuthenticatedRequest;
  return getUserProfile(authenticatedReq, res);
});

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Atualiza o perfil do usuário autenticado
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Usuário não encontrado
 */
router.put('/profile', authMiddleware, (req, res) => {
  const authenticatedReq: AuthenticatedRequest = req as AuthenticatedRequest;
  return updateUserProfile(authenticatedReq, res);
});

/**
 * @swagger
 * /api/users/profile:
 *   delete:
 *     summary: Deleta o usuário autenticado
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Usuário não encontrado
 */
router.delete('/profile', authMiddleware, (req, res) => {
  const authenticatedReq: AuthenticatedRequest = req as AuthenticatedRequest;
  return deleteUser(authenticatedReq, res);
});

export default router;