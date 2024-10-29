import express from "express";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import connect from "./database/mongodb-connect.js";
import router from "./routes/todos.js";
import usersRouter from "./routes/users.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Use body-parser middleware before routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the "frontend" directory
app.use(express.static("frontend"));

// Route handlers for API
app.use("/api", router);
app.use("/api", usersRouter);

// Root route to serve index.html
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "frontend", "index.html"));
});

// Catch-all route for undefined paths to serve 404 page
app.get("*", (req, res) => {
  res.status(404).sendFile(join(__dirname, "frontend", "404.html"));
});

// Attempt connection to MongoDB
connect();

// Start the server
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
