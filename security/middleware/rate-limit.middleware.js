const rateLimit = require("express-rate-limit");
const { client: redisClient, isReady } = require("../utils/redis.client");
const config = require("../config/security.config");

const createRateLimiter = (type = "global") => {
  const store = {
    incr: async (key) => {
      return await redisClient.incr(key);
    },
    ttl: async (key) => {
      return await redisClient.ttl(key);
    },
    expire: async (key, ttl) => {
      return await redisClient.expire(key, ttl);
    },
    del: async (key) => {
      return await redisClient.del(key);
    },
    resetKey: async (key) => {
      const count = await redisClient.get(key);
      if (count) {
        await redisClient.set(key, 1);
      }
      return count ? 1 : 0;
    },
  };

  const limiter = rateLimit({
    windowMs: config.rateLimit[type].windowMs,
    max: config.rateLimit[type].max,
    message: {
      error:
        type === "login"
          ? "Too many login attempts. Please try again later."
          : "Too many requests, please try again later.",
    },
    store,
  });

  // Return a middleware that checks Redis readiness
  return (req, res, next) => {
    if (!isReady) {
      return res.status(503).json({
        error: "Service unavailable. Please try again later.",
      });
    }
    return limiter(req, res, next);
  };
};

// Create limiters immediately since Redis is initialized on module load
const globalLimiter = createRateLimiter();
const loginLimiter = createRateLimiter("login");

module.exports = {
  global: globalLimiter,
  login: loginLimiter
};
