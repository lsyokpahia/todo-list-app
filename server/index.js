import express from "express";
import connect from "./database/mongodb-connect.js";

import router from "./routes/todos.js";
import usersRouter from "./routes/users.js";

const app = express();
const port = 3000;

// Use body-parser middleware before routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use the static middleware to serve static files
app.use(express.static("public"));

// Route handlers
app.use("/api", router);
app.use("/api", usersRouter);

// Root route
app.get("/", (req, res) => {
  res.send("Hello Todo App!!!");
});

// Attempt connection to MongoDB
connect();

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});