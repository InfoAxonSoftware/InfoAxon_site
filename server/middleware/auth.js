import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { prisma } from '../config/prisma.js';

export async function requireAdmin(req, res, next) {
  try {
    const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
    if (!token) return res.status(401).json({ message: 'Authentication required' });
    const payload = jwt.verify(token, env.jwtSecret);
    const admin = await prisma.adminUser.findUnique({ where: { id: payload.sub }, select: { id: true, username: true } });
    if (!admin) return res.status(401).json({ message: 'Session is no longer valid' });
    req.admin = admin;
    next();
  } catch {
    res.status(401).json({ message: 'Session expired or invalid' });
  }
}
