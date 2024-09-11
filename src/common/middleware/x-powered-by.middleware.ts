// @file: src/common/middleware/x-powered-by.middleware.ts

import { env } from '@/config/env';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class XPoweredByMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.removeHeader('X-Powered-By');
    res.setHeader('X-Powered-By', env('X_POWERED', atob('RGFuU1AuREVW')));
    next();
  }
}
