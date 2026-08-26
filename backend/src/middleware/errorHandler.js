const isProd = process.env.NODE_ENV === 'production';

const notFound = (req, res, next) => {
  res.status(404).json({ code: 'NOT_FOUND', message: `Route not found: ${req.originalUrl}` });
};

const errorHandler = (err, req, res, next) => {
  let status = err.statusCode || err.status || 500;
  let message = err.message || 'Internal server error.';

  if (err.name === 'CastError') { status = 400; message = 'Invalid identifier.'; }
  if (err.name === 'ValidationError') {
    status = 422;
    message = Object.values(err.errors).map((e) => e.message).join('; ');
  }
  if (err.code === 11000) { status = 409; message = 'Duplicate value for a unique field.'; }
  if (err.name === 'MulterError') { status = 400; message = err.message; }

  if (status >= 500) console.error('[ERROR]', err);

  res.status(status).json({
    code: typeof err.code === 'string' ? err.code : 'ERROR',
    message,
    stack: isProd ? undefined : err.stack,
  });
};

module.exports = { errorHandler, notFound };