import { Injectable, Inject } from '@nestjs/common';
import { BaseConfigService } from './base-config.service';
import { RedisOptions } from 'ioredis';

@Injectable()
export class ConfigService {
  env: any;
  constructor(
    @Inject('CONFIG_OPTIONS') configs: any,
    private readonly baseConfig: BaseConfigService,
  ) {
    this.env = this.baseConfig.validateInput(configs);
    console.info('[this.env]-----', this.env);
  }

  get nodeEnv(): string {
    return String(this.env.NODE_ENV);
  }
  get port(): number {
    return Number(this.env.APP_PORT);
  }

  get redisHost(): string {
    return String(this.env.REDIS_HOST);
  }

  get redisPort(): number {
    return Number(this.env.REDIS_PORT);
  }

  get countriesBaseUrl(): string {
    return String(this.env.COUNTRIES_BASE_URL);
  }
  getRedisOptions(enableOffline = true, db = 0): RedisOptions {
    return {
      host: this.redisHost,
      port: this.redisPort || 6379,
      db: db,
      enableOfflineQueue: enableOffline,
      enableReadyCheck: true,
    };
  }
}
