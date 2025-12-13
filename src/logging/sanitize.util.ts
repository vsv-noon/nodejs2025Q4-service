const SENSITIVE_FIELDS = [
  'password',
  'confirmPassword',
  'refreshToken',
  'accessToken',
];

export function sanitizeObject(obj: any): any {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }

  const sanitized: any = {};

  for (const key of Object.keys(obj)) {
    if (SENSITIVE_FIELDS.includes(key)) {
      sanitized[key] = '***';
    } else {
      sanitized[key] = sanitizeObject(obj[key]);
    }
  }

  return sanitized;
}
