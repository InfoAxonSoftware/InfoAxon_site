export function notFound(req, res) {
  res.status(404).json({ message: 'Resource not found' });
}

export function errorHandler(error, req, res, next) {
  console.error(error);
  if (error.code === 'P2002') return res.status(409).json({ message: 'A record with that name or slug already exists' });
  if (error.code === 'P2003') return res.status(409).json({ message: 'This record is still in use and cannot be deleted' });
  res.status(error.status || 500).json({ message: error.status ? error.message : 'An unexpected server error occurred' });
}
