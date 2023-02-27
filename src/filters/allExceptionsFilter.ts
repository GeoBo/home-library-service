import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch(Error)
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(`HTTP`);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const { params, query, body } = request;
    const url = httpAdapter.getRequestUrl(request);
    const method = httpAdapter.getRequestMethod(request);
    const message = 'Internal server error';
    const status = HttpStatus.INTERNAL_SERVER_ERROR;

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

    if (
      typeof exception === 'object' &&
      'message' in exception &&
      'name' in exception
    ) {
      this.logger.error(exception.message, exception.name);
    } else this.logger.error(exception.toString());

    const responseBody = {
      statusCode: status,
      message,
      timestamp: new Date().toUTCString(),
      path: url,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, status);
  }
}
