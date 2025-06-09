const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();
const PORT = 3000;

// Session middleware (must be before routes using req.session)
app.use(
  session({
    secret: "student1234",
    resave: false,
    saveUninitialized: true,
  })
);

// DB and models
const dbModel = require("./models");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
const { consoleLogger } = require("./middleware/logger.middleware");
app.use(consoleLogger);

// Custom middlewares
app.use(require("./middleware/response.middleware"));

// View engine setup (if you use views)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Sync database
dbModel.sequelize
  .sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.error("Sync error:", err));

// Routes
app.use("/", require("./routes/student.route"));
app.use("/", require("./routes/login.route"));
app.use("/", require("./routes/user.route"));

app.use(require("./middleware/error-filter.middleware"));
// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
