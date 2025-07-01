const express = require("express");
require("express-async-errors");
const mongoose = require("mongoose");
const cors = require("cors");

// Import utility modules
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

// Import route controllers
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

// Initialize Express app
const app = express();

// Configure Mongoose
mongoose.set("strictQuery", false);
logger.info("Connecting to MongoDB...");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info("Connected to MongoDB"))
  .catch((error) =>
    logger.error("Error connecting to MongoDB:", error.message)
  );

// Middleware setup
app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use(middleware.requestLogger);

// Route setup
if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

// Error handling middleware
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

// Export app module
module.exports = app;
