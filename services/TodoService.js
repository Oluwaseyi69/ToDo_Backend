const Todo = require("../model/TodoModel");

const createTodo = async ({ title, description, dueDate, userId }) => {
  try {
    const createdDate = new Date();
    const due = new Date(dueDate);

    if (due <= createdDate) {
      throw new Error("Due date must be greater than the created date");
    }

    const todo = new Todo({
      title,
      description,
      dueDate: due,
      userId,
    });

    return await todo.save();
  } catch (error) {
    throw new Error(error.message);
  }
};
const viewAllTodos = async () => {
  try {
    const todos = await Todo.find({});
    return todos;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserTodos = async (userId) => {
  try {
    const todos = await Todo.find({ userId });
    return todos;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateTodo = async (todoId, updatedData) => {
  console.log("i am at service");
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(todoId, updatedData, {
      new: true,
    });
    if (!updatedTodo) {
      throw new Error("Todo not found");
    }
    return updatedTodo;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteTodo = async (todoId) => {
  try {
    const result = await Todo.findByIdAndDelete(todoId);

    if (!result) {
      throw new Error("Todo not found");
    }

    return result;
  } catch (err) {
    console.error("Service Error", err.message);
    throw new Error("Error deleting todo");
  }
};

const markAsComplete = async (todoId) => {
  try {
    const todoCompleted = await Todo.findById(todoId);
    if (!todoId) {
      throw new Error("Todo Not Found!!!");
    }

    todoCompleted.completed = true;
    todoCompleted.completedAt = new Date();
    return await todoCompleted.save();
  } catch (error) {
    throw new Error("Unable to Mark As Complete");
  }
};

module.exports = {
  createTodo,
  viewAllTodos,
  getUserTodos,
  updateTodo,
  deleteTodo,
  markAsComplete,
};
