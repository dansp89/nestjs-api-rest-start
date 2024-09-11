// @file: src/core/casbin/casbin.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import * as casbin from 'casbin';

@Injectable()
export class CasbinService implements OnModuleInit {
  private enforcer: casbin.Enforcer;

  async onModuleInit() {
    // Caminho atualizado para os arquivos de configuração
    this.enforcer = await casbin.newEnforcer(
      './src/config/model.conf',
      './src/config/policy.csv',
    );
  }

  async can(
    userRole: string,
    resource: string,
    action: string,
  ): Promise<boolean> {
    return await this.enforcer.enforce(userRole, resource, action);
  }

  async addPolicy(sub: string, obj: string, act: string) {
    await this.enforcer.addPolicy(sub, obj, act);
  }

  async getAllPolicies() {
    return this.enforcer.getPolicy();
  }
}
