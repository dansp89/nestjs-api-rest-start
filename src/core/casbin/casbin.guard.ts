// @file: src/core/casbin/casbin.guard.ts

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { CasbinService } from '@/src/core/casbin/casbin.service';

@Injectable()
export class CasbinGuard implements CanActivate {
  constructor(private casbinService: CasbinService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userRole = request.user?.role || 'guest'; // Assumindo que a role do usuário está no objeto request.user
    const resource = request.route.path;
    const action = request.method.toLowerCase();

    return this.casbinService.can(userRole, resource, action);
  }
}
