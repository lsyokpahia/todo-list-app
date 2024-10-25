import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// Define the schema for a Todo
const todoSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,  // Reference to the User model
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

// Create the model from the schema
const Todo = model('Todo', todoSchema);

// Export the model
export default Todo;