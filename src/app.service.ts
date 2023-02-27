import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(`Uncaught`);

  constructor() {
    process.on('uncaughtException', (err) => {
      this.logger.error(err.message, err.name);
      console.log('Logged and exit with code 1');
      process.exit(1);
    });

    process.on('unhandledRejection', (err) => {
      if (typeof err === 'object' && 'message' in err && 'name' in err) {
        this.logger.error(err.message, err.name);
      } else this.logger.error(err.toString());

      console.log('Logged and exit with code 1');
      process.exit(1);
    });
  }
}
