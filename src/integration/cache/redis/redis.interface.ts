export default interface RedisInterface {
    set<T>(key: string, value: T, expireIn: number): boolean;
    get(key: string): Promise<string>;
    remove(key: string): Promise<number>;
    ttl(key: string): Promise<number>;
}