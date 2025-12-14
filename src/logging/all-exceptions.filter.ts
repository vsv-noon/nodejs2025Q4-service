import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggingService } from 'src/logging/logging.service';

@Injectable()
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggingService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();

      this.logger.warn('Handled HTTP exception', {
        path: req.url,
        status,
        message: exception.message,
      });

      return res.status(status).json({
        statusCode: status,
        message: exception.message,
        path: req.url,
      });
    }

    this.logger.error('Unhandled exception occurred', {
      error: (exception as any)?.message,
      stack: (exception as any)?.stack,
      url: req.url,
    });

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
      path: req.url,
    });
  }
}
