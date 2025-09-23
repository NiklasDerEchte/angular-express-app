import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  res.on('finish', () => {
    const now = new Date().toISOString();
    let emoji = '';
    if (res.statusCode >= 100 && res.statusCode < 200) emoji = '💡';
    else if (res.statusCode >= 200 && res.statusCode < 300) emoji = '✅';
    else if (res.statusCode >= 300 && res.statusCode < 400) emoji = '🚦';
    else if (res.statusCode >= 400 && res.statusCode < 500) emoji = '⚠️';
    else if (res.statusCode >= 500) emoji = '🔥';

    console.log(`${emoji} [${now}] ${req.method} ${req.originalUrl} - ${res.statusCode}`);
  });
  next();
}