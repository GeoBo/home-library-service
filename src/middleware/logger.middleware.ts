import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(`HTTP`);

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', async () => {
      const { method, params, query, body, originalUrl } = req;
      const { statusCode, statusMessage } = res;

      const message = {
        url: originalUrl,
        method,
        params,
        query,
        body,
        status: statusCode,
        message: statusMessage,
      };

      // if (statusCode >= 500) {
      //   return this.logger.error(message);
      // }
      // if (statusCode >= 400) {
      //   return this.logger.warn(message);
      // }
      // this.logger.log(message)
      if (statusCode < 400) this.logger.log(message);
    });
    next();
  }
}
