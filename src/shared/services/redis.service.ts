import { Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from './config.service';

@Injectable()
export class RedisService {
  client: Redis.Redis;

  constructor(private readonly _configs: ConfigService) {
    this.client = this.initializeClient('[RedisService]');
  }

  initializeClient(serviceName: string, enableOffline = true, db = 0) {
    const client = new Redis(this._configs.getRedisOptions(enableOffline, db));
    client.ping((err, result) => {
      Logger.log(`${result} : Redis database Connected`);
    });

    client.on('ready', () => {
      Logger.log(`${serviceName} : Redis service initialized`);
    });

    client.on('error', (err) => {
      Logger.error({ message: 'Redis encountered an error : ', err });
    });

    return client;
  }

  async setEx(key: string, seconds: number, value: any): Promise<string> {
    return await this.client.setex(key, seconds, value);
  }

  async get(key: string): Promise<string> {
    return await this.client.get(key);
  }
}
