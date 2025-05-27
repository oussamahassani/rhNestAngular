

import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileLoggerService extends ConsoleLogger {
  private logFilePath = path.join(__dirname, '../../logs/app.log');

  private writeToFile(level: string, message: string) {
    const log = `[${new Date().toISOString()}] [${level}] ${message}\n`;
    fs.appendFileSync(this.logFilePath, log, 'utf8');
  }

  log(message: string) {
    super.log(message);
    this.writeToFile('LOG', message);
  }

error(message: string, stack?: string) {
    super.error(message, stack);
    this.writeToFile('ERROR', `${message} - ${stack}`);
  }

  warn(message: string) {
    super.warn(message);
    this.writeToFile('WARN', message);
  }

  debug(message: string) {
    super.debug(message);
    this.writeToFile('DEBUG', message);
  }

  verbose(message: string) {
    super.verbose(message);
    this.writeToFile('VERBOSE', message);
  }
    }