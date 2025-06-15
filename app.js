const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// DB and models
const dbModel = require("./models");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
const { consoleLogger } = require("./middleware/logger.middleware");
app.use(consoleLogger);

// Custom middlewares
app.use(require("./security/middleware/auth.middleware"));
app.use(require("./middleware/response.middleware"));

const startServer = async () => {
  try {
    await dbModel.sequelize.authenticate();
    console.log("Database connection established");
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Start the server
startServer();

// Routes
app.use("/", require("./routes/student.route"));
app.use("/", require("./routes/authentication.route"));
app.use("/", require("./routes/user.route"));

app.use(require("./middleware/exception-filter.middleware"));

//security
const helmet = require("helmet");
app.disable("x-powered-by");
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'self'"],
        "script-src": ["'self'", "https://trusted.cdn.com"],
        "style-src": [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
        ],
        "font-src": ["'self'", "https://fonts.gstatic.com"],
        "img-src": ["'self'", "data:", "https:"],
        "connect-src": ["'self'", "http://localhost:3000"], //use your own domain
        "object-src": ["'none'"],
        "frame-ancestors": ["'none'"],
        "base-uri": ["'self'"],
      },
    },
    crossOriginOpenerPolicy: { policy: "same-origin" },
    crossOriginResourcePolicy: { policy: "same-origin" },
    originAgentCluster: true,
    referrerPolicy: { policy: "no-referrer" },
    strictTransportSecurity: {
      maxAge: 63072000,
      includeSubDomains: true,
      preload: true,
    },
    xContentTypeOptions: true,
    dnsPrefetchControl: { allow: false },
    frameguard: { action: "deny" },
    permittedCrossDomainPolicies: { policy: "none" },
    hidePoweredBy: true,
  })
);

//Rate limit
const {
  global: globalLimiter,
} = require("./security/middleware/rate-limit.middleware");
app.use(globalLimiter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
