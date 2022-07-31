import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

/**
 * 미들웨어 route handler가 호출되기 전에 호출
 * default: express middleware
 * Response, Request 데이터를 갖고 있음
 * app.module.ts에 등록
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('LoggerMiddleware');

  use(req: Request, res: Response, next: NextFunction) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    this.logger.log(`requset URL : ${url}`);
    next();
  }
}
