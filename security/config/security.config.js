const config = {
  jwt: {
    access: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    },
    refresh: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    },
  },
  rateLimit: {
    global: {
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
      max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
    },
    login: {
      windowMs:
        parseInt(process.env.LOGIN_RATE_LIMIT_WINDOW_MS) || 5 * 60 * 1000,
      max: parseInt(process.env.LOGIN_RATE_LIMIT_MAX) || 5,
    },
  },
  redis: {
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
  },
};

module.exports = config;
