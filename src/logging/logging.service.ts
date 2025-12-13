import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

type LogLevel = 'error' | 'warn' | 'info' | 'debug';

@Injectable()
export class LoggingService {
  private level: LogLevel;
  private logFilePath: string;
  private maxSizeBytes: number;

  constructor() {
    this.level = (process.env.LOG_LEVEL as LogLevel) || 'info';
    this.logFilePath = process.env.LOG_FILE_PATH || 'logs/app.log';
    const maxKb = Number(process.env.LOG_MAX_SIZE_KB || 1024);

    this.maxSizeBytes = maxKb * 1024;

    const dir = path.dirname(this.logFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  private shouldLog(level: LogLevel): boolean {
    const order: LogLevel[] = ['error', 'warn', 'info', 'debug'];
    return order.indexOf(level) <= order.indexOf(this.level);
  }

  private rotateIfNeeded() {
    if (!fs.existsSync(this.logFilePath)) return;

    const size = fs.statSync(this.logFilePath).size;
    if (size < this.maxSizeBytes) return;

    const rotated = this.logFilePath + '.1';

    if (fs.existsSync(rotated)) {
      fs.unlinkSync(rotated);
    }

    fs.renameSync(this.logFilePath, rotated);
  }

  private write(level: LogLevel, message: string, meta?: any) {
    if (!this.shouldLog(level)) return;

    const timestamp = new Date().toISOString();
    const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';

    const line = `${timestamp} [${level}] ${message}${metaStr}\n`;

    process.stdout.write(line);

    try {
      this.rotateIfNeeded();
      fs.appendFileSync(this.logFilePath, line);
    } catch {}
  }

  error(message: string, meta?: any) {
    this.write('error', message, meta);
  }

  warn(message: string, meta?: any) {
    this.write('warn', message, meta);
  }

  info(message: string, meta?: any) {
    this.write('info', message, meta);
  }

  debug(message: string, meta?: any) {
    this.write('debug', message, meta);
  }
}
