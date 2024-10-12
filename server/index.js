import router from "./routes/todos.js"; // No need to import "proppatch"
import express from "express";
const app = express();

const port = 5500;

app.use('/api', router);

app.listen(port, () => console.log(`Server running on port ${port}`));
