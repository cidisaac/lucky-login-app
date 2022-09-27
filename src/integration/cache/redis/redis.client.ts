import * as Redis from 'ioredis';
import {Injectable} from '@nestjs/common';
import RedisInterface from './redis.interface';
import {ConfigService} from "@nestjs/config";

@Injectable()
class RedisClient implements RedisInterface {
    private client: Redis.Redis;

    constructor(private readonly configService: ConfigService) {
        this.client = this.getConnection();
    }

    private getConnection(): Redis.Redis {
        const {port, host} = this.configService.get('redis')
        return new Redis(port, host);
    }

    set<T>(key: string, value: T, expireIn: number): boolean {
        return !!this.client.set(
            key,
            value as unknown as Redis.ValueType,
            'ex',
            expireIn
        );
    }

    get(key: string): Promise<string | null> {
        return this.client.get(key);
    }

    remove(key: string): Promise<number> {
        return this.client.del(key);
    }

    ttl(key: string): Promise<number> {
        return this.client.ttl(key);
    }
}

export default RedisClient;
