export default () => ({
    node_port: process.env.NODE_PORT || 3000,
    tsEnv: process.env.TS_ENV,
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD || 'root',
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'secretKey'
    },
    redis: {
        port: parseInt(process.env.REDIS_PORT) || 6379,
        host: process.env.REDIS_HOST || 'localhost'
    }
});
