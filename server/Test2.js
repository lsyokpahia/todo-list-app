import express from "express";
const app = express();
const todosRouter = express.Router();
 
const port = 4000;
 
// reading all todo items
app.get("/test1", (req, res) => {
  res.send("Test 1");
});
 
 
// getting specific todo item with id as parameter
app.get("/test1/:param1", (req, res) => {
  // get the todo id from the url
  const firstParam = req.params.param1;
  const query = req.query;
 
 
  res.send(query);
});
 
app.post("/test2", (req, res) => {
    res.redirect("Test 2");
});

app.get("/test3", (req, res) => {
    res.send("redirected!!!");
})

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});