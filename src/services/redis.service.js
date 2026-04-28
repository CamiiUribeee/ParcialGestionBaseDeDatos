import { createClient } from "redis";

export const getConnection = async() => {
    const redis = createClient({ url: 'redis://localhost:6379'});
    await redis.connect();
    return redis;
}