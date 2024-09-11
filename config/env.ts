// @file: config/env.ts

import * as dotenv from 'dotenv';
dotenv.config();

export function env(key: string, defaultValue?: any): any {
  return process.env[key] || defaultValue || '';
}
