import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import multer from 'multer';
import { env } from '../config/env.js';

const uploadDir = path.resolve('server/uploads');
fs.mkdirSync(uploadDir, { recursive: true });
const allowed = new Set(['image/png', 'image/jpeg', 'image/webp']);
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => cb(null, `${Date.now()}-${crypto.randomUUID()}${path.extname(file.originalname).toLowerCase()}`),
});
export const upload = multer({
  storage,
  limits: { fileSize: env.uploadMaxSize },
  fileFilter: (req, file, cb) => allowed.has(file.mimetype) ? cb(null, true) : cb(Object.assign(new Error('Only PNG, JPG, JPEG, and WebP images are accepted'), { status: 400 })),
});
