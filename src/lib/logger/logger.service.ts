import { ConsoleLogger } from '@nestjs/common';
import { saveToFile } from '../fsOpertions';

const level = Number(process.env.LOG_LEVEL);

export class LoggerService extends ConsoleLogger {
  log(message: any, stack?: string) {
    if (
      stack === 'InstanceLoader' ||
      stack === 'RouterExplorer' ||
      stack === 'RoutesResolver'
    ) {
      return;
    }
    if (level < 2) return;
    saveToFile(message, stack);
    super.log(message, stack);
  }

  warn(message: any, stack?: string) {
    if (level < 1) return;
    saveToFile(message, stack, 'warn');
    super.warn(message, stack);
  }

  error(message: any, stack?: string) {
    if (level < 0) return;
    saveToFile(message, stack, 'error');
    super.error(message, stack);
  }
}
