import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logging.service';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    this.logger.info('Incoming request', {
      method: req.method,
      url: req.originalUrl,
      query: req.query,
      body: req.body,
    });

    res.on('finish', () => {
      const time = Date.now() - start;

      this.logger.info('Request completed', {
        url: req.originalUrl,
        method: req.method,
        statusCode: res.statusCode,
        durationMs: time,
      });
    });

    next();
  }
}
