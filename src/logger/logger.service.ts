import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class MyLogger extends ConsoleLogger {
  // Customize error logging
  error(message: any, stack?: string, context?: string) {
    // Add tailored logic here
    const formattedMessage = `[ERROR] ${context || 'Application'} - ${message}`;
    super.error(formattedMessage, stack, context);
  }

  // Customize log messages
  log(message: any, context?: string) {
    const formattedMessage = `[LOG] ${context || 'Application'} - ${message}`;
    super.log(formattedMessage, context);
  }

  // Customize warnings
  warn(message: any, context?: string) {
    const formattedMessage = `[WARNING] ${context || 'Application'} - ${message}`;
    super.warn(formattedMessage, context);
  }

  // Customize debug messages
  debug(message: any, context?: string) {
    const formattedMessage = `[DEBUG] ${context || 'Application'} - ${message}`;
    super.debug(formattedMessage, context);
  }

  // Customize verbose logging if needed
  verbose(message: any, context?: string) {
    const formattedMessage = `[VERBOSE] ${context || 'Application'} - ${message}`;
    super.verbose(formattedMessage, context);
  }
}
