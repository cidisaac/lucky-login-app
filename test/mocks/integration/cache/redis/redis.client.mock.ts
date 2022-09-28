import {Test, TestingModule} from '@nestjs/testing';
import RedisClient from "../../../../../src/integration/cache/redis/redis.client";

const redisClientMock = async (
    mockRedisClient: unknown
): Promise<RedisClient> => {
    const module: TestingModule = await Test.createTestingModule({
        providers: [
            {
                provide: RedisClient,
                useValue: mockRedisClient
            }
        ]
    }).compile();
    return module.get<RedisClient>(RedisClient);
};

export default redisClientMock;
