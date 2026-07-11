export function notFound(req, res) {
  res.status(404).json({ message: 'Resource not found' });
}

export function errorHandler(error, req, res, next) {
  const errorId = crypto.randomUUID();
  console.error({errorId,method:req.method,route:req.originalUrl,errorName:error.name,prismaCode:error.code,errorMessage:error.message,...(process.env.NODE_ENV !== 'production' && {stack:error.stack})});
  if(error.code==='LIMIT_FILE_SIZE')return res.status(413).json({message:'Image is larger than the allowed upload size',code:'IMAGE_TOO_LARGE',errorId});
  if (error.code === 'P2002') return res.status(409).json({ message: 'A record with that name or slug already exists' });
  if (error.code === 'P2003') return res.status(409).json({ message: 'This record is still in use and cannot be deleted' });
  if (error.code === 'P2025') return res.status(404).json({message:'The record no longer exists',errorId});
  if (error.name === 'PrismaClientValidationError') return res.status(400).json({message:error.safeMessage||'The submitted fields are invalid',code:'PRISMA_VALIDATION_ERROR',errorId});
  if (error.code === 'P2021' || error.code === 'P2022') return res.status(500).json({message:error.safeMessage||'The database schema is not up to date',code:'DATABASE_SCHEMA_MISMATCH',errorId});
  res.status(error.status || 500).json({ message: error.status ? error.message : (error.safeMessage||'The server could not complete this request'), code:error.apiCode||'INTERNAL_SERVER_ERROR', errorId });
}
