const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});

// const express = require("express");
// const morgan = require("morgan");
// const cors = require("cors");
// const app = express();
// const Blog = require("./models/blog");
// const config = require("./utils/config");
// const logger = require("./utils/logger");
// const blogsRouter = require("./controllers/blogs");
// app.use(cors());
// app.use(express.json());
// morgan.token("body", (req) => JSON.stringify(req.body));
// app.use(
//   morgan(":method :url :status :res[content-length] - :response-time ms :body")
// );
// app.use("/api/blogs", blogsRouter);

// app.get("/info", (request, response) => {
//   Blog.countDocuments({}).then((count) => {
//     const currentDate = new Date();
//     response.send(`
//         <p>There are ${count} blogs.</p>
//         <p>${currentDate}</p>
//       `);
//   });
// });

// app.use(unknownEndpoint);
// app.use(errorHandler);

// app.listen(config.PORT, () => {
//   logger.info(`Server running on port ${config.PORT}`);
// });
