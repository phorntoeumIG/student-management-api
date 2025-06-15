const { createClient } = require("ioredis");
const config = require("../config/security.config");

// Singleton Redis client
let redisClient = null;
let isReady = false;

const initializeRedis = async () => {
  // If client exists and is in connecting/ready state, return it
  if (
    redisClient &&
    (redisClient.status === "connecting" || redisClient.status === "ready")
  ) {
    console.log("Redis client already connecting/connected");
    return redisClient;
  }

  // If client exists but is disconnected, try to reconnect
  if (redisClient) {
    try {
      await redisClient.connect();
      console.log("Redis client reconnected successfully");
      return redisClient;
    } catch (error) {
      console.error("Failed to reconnect Redis client:", error);
    }
  }

  // Create new client if needed
  redisClient = createClient({
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.password,
    retryStrategy: (times) => {
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
  });

  // Connection state tracking
  redisClient.on("error", (error) => {
    console.error("Redis connection error:", error);
  });

  redisClient.on("connect", () => {
    console.log("Redis connected successfully");
  });

  redisClient.on("ready", () => {
    console.log("Redis client ready");
    isReady = true;
  });

  redisClient.on("reconnecting", () => {
    console.log("Redis reconnecting...");
  });

  redisClient.on("end", () => {
    console.log("Redis connection closed");
    isReady = false;
  });

  // Initialize connection
  try {
    await redisClient.connect();
    return redisClient;
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
    throw error;
  }
};

const getClient = async () => {
  if (!redisClient || redisClient.status !== "ready") {
    await initializeRedis();
  }
  return redisClient;
};

const isRedisReady = () => isReady;

module.exports = {
  getClient,
  isRedisReady,
};
