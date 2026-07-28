const express = require("express");
const cors = require("cors");  // ← ADD THIS LINE
const systemRoutes = require("./routes/systemRoutes");
const gameRoutes = require("./routes/gameRoutes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Enable CORS for all requests
app.use(cors());  // ← ADD THIS LINE

app.use(express.json());

app.use("/", systemRoutes);
app.use("/games", gameRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;