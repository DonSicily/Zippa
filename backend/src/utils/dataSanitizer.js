// Prevents NoSQL Injection and Cross-Site Scripting (XSS).
// Sanitizes incoming request bodies, query parameters, and params.

// Prevents NoSQL Injection by removing keys starting with '$' or containing '.'
const sanitizeNoSQL = (obj) => {
  if (typeof obj !== 'object' || obj === null) return obj;

  for (const key in obj) {
    if (key.startsWith('$') || key.includes('.')) {
      delete obj[key];
    } else if (typeof obj[key] === 'object') {
      sanitizeNoSQL(obj[key]);
    }
  }
  return obj;
};

// Prevents XSS by stripping basic HTML tags from string values
const sanitizeXSS = (str) => {
  if (typeof str !== 'string') return str;
  return str.replace(/<[^>]*>?/gm, '');
};

// Middleware to apply sanitization to the entire request
exports.sanitizeRequest = (req, res, next) => {
  if (req.body) req.body = sanitizeNoSQL(req.body);
  if (req.query) req.query = sanitizeNoSQL(req.query);
  if (req.params) req.params = sanitizeNoSQL(req.params);

  // Deep sanitize strings for XSS
  const deepSanitize = (obj) => {
    if (typeof obj === 'string') return sanitizeXSS(obj);
    if (Array.isArray(obj)) return obj.map(deepSanitize);
    if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        obj[key] = deepSanitize(obj[key]);
      }
    }
    return obj;
  };

  if (req.body) req.body = deepSanitize(req.body);
  if (req.query) req.query = deepSanitize(req.query);

  next();
};

// FIX: this previously overwrote `exports.sanitizeRequest` (set above),
// silently discarding the actual middleware function. Nothing importing
// `{ sanitizeRequest }` from this module would have gotten `undefined`.
module.exports = { sanitizeNoSQL, sanitizeXSS, sanitizeRequest: exports.sanitizeRequest };
