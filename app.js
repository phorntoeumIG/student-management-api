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
app.use(require("./middleware/auth.middleware"));
app.use(require("./middleware/response.middleware"));

(async () => {
  try {
    await dbModel.sequelize.authenticate();
    console.log("Database connection established");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
})();

// Routes
app.use("/", require("./routes/student.route"));
app.use("/", require("./routes/authentication.route"));
app.use("/", require("./routes/user.route"));

app.use(require("./middleware/error-filter.middleware"));
// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
