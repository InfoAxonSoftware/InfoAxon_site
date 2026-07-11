import { z } from 'zod';

export const idParam = z.object({ id: z.string().min(1) });
export function validate(schema, source = 'body') {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) return res.status(400).json({ message: 'Validation failed', errors: result.error.flatten().fieldErrors });
    req[source] = result.data;
    next();
  };
}
