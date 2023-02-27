import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(`HTTP`);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const { url, method, params, query, body } = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const { message } = exception;

    const logMessage = {
      url,
      method,
      params,
      query,
      body,
      status,
      message,
    };

    this.logger.warn(logMessage);

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toUTCString(),
      path: url,
    });
  }
}
