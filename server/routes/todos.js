import express from "express";
const router = express.Router();
import Todo from "../models/todos.js";
import User from "../models/user.js";  

// READ
router.get("/todos/:userId", async (req, res) => {
  const userId = req.params.userId;
  const todoId = req.query.id;  // Get the todoId from the query string (like ?id=TODO_ID)

  try {
    // Ensure the user exists before fetching todos
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (todoId) {
      // Find the specific todo by its id for the given user
      const todo = await Todo.findOne({ _id: todoId, user: userId });
      if (!todo) {
        return res.status(404).json({ error: "Todo not found for this user" });
      }
      return res.json(todo);
    } else {
      // If no todoId is provided, return all todos for the user
      const todos = await Todo.find({ user: userId });
      return res.json(todos);
    }
  } catch (error) {
    return res.status(400).json({ error: "Error retrieving todos" });
  }
});

// CREATE
router.post("/todos/:userId", async (req, res) => {
  const userId = req.params.userId;
  const { title, description } = req.body;

  try {
    // Ensure the user exists before creating a todo
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a new Todo
    const newTodo = new Todo({
      user: userId,  // Reference the user ID
      title,
      description
    });

    const savedTodo = await newTodo.save();
    return res.status(201).json(savedTodo);
  } catch (error) {
    return res.status(400).json({ error: "Error creating todo" });
  }
});

// UPDATE
router.put("/todos/:userId/:todoId", async (req, res) => {
  const userId = req.params.userId;
  const todoId = req.params.todoId;
  const { title, description } = req.body;

  try {
    // Ensure the user exists before updating a todo
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the todo by ID and user ID and update it
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: todoId, user: userId },
      { title, description },
      { new: true, runValidators: true } 
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    return res.json(updatedTodo);
  } catch (error) {
    return res.status(400).json({ error: "Error updating todo" });
  }
});

// DELETE
router.delete("/todos/:todoId", async (req, res) => {
  const todoId = req.params.todoId;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(todoId);
    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    return res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    return res.status(400).json({ error: "Error deleting todo" });
  }
});

export default router;