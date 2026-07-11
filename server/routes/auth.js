import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../config/prisma.js';
import { env } from '../config/env.js';
import { requireAdmin } from '../middleware/auth.js';
import { validate } from '../validators/common.js';

const router = Router();
const loginSchema = z.object({ username: z.string().min(1).max(80), password: z.string().min(8).max(200) });
router.post('/login', validate(loginSchema), async (req, res) => {
  const admin = await prisma.adminUser.findUnique({ where: { username: req.body.username } });
  if (!admin || !(await bcrypt.compare(req.body.password, admin.passwordHash))) return res.status(401).json({ message: 'Invalid username or password' });
  const token = jwt.sign({}, env.jwtSecret, { subject: admin.id, expiresIn: env.jwtExpiresIn });
  res.json({ token, admin: { id: admin.id, username: admin.username } });
});
router.get('/me', requireAdmin, (req, res) => res.json({ admin: req.admin }));
router.post('/change-password', requireAdmin, validate(z.object({ currentPassword: z.string().min(8), newPassword: z.string().min(10).max(200) })), async (req, res) => {
  const admin = await prisma.adminUser.findUnique({ where: { id: req.admin.id } });
  if (!(await bcrypt.compare(req.body.currentPassword, admin.passwordHash))) return res.status(400).json({ message: 'Current password is incorrect' });
  await prisma.adminUser.update({ where: { id: admin.id }, data: { passwordHash: await bcrypt.hash(req.body.newPassword, 12) } });
  res.json({ message: 'Password changed successfully' });
});
router.post('/logout', requireAdmin, (req, res) => res.status(204).end());
export default router;
