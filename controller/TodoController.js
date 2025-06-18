const todoService = require("../services/TodoService");

exports.createTodo = async (req, res) => {
  console.log("Controller: Create Todo Method Hit");
  console.log("Request Body:", req.body);
  console.log("Request User:", req.user);

  try {
    const { title, description, dueDate } = req.body;
    const userId = req.user.userId; // Only controller should access `req`

    const savedTodo = await todoService.createTodo({
      title,
      description,
      dueDate,
      userId,
    });

    res.status(201).json({
      message: "Todo created successfully",
      todo: savedTodo,
    });
  } catch (error) {
    console.error("Create Todo Error:", error.message);
    res.status(400).json({ message: error.message });
  }
};

// controller.js
exports.viewAll = async (req, res) => {
  console.log("Controller: View All Todos Method Hit");

  try {
    const todos = await todoService.viewAllTodos();
    console.log("Todos", todos);

    res.status(200).json({
      message: "Todos retrieved successfully",
      todos,
    });
  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      error: err.message,
    });
  }
};

exports.viewTodos = async (req, res) => {
  try {
    const userId = req.user.userId;

    const viewTodos = await todoService.getUserTodos(userId);

    res.status(200).json({
      viewTodos,
    });
  } catch (error) {
    console.error("Error fetching todos:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.updateTodo = async (req, res) => {
  console.log("Controller: Update Todo Method Hit");
  console.log("Request Body:", req.body);
  console.log("Request Params:", req.params);

  try {
    const todoId = req.params.id;
    const updatedData = req.body;

    const updatedTodo = await todoService.updateTodo(todoId, updatedData);
    console.log("Updated Todo:", updatedTodo);

    res.status(200).json({ message: "Todo updated successfully", updatedTodo });
  } catch (err) {
    console.error("Error", err.message);
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTodo = async (req, res) => {
  console.log("Controller: Delete Todo Method Hit");
  console.log("Request Params:", req.params);

  try {
    const todoId = req.params.id;

    await todoService.deleteTodo(todoId);
    console.log("Deleted Todo ID:", todoId);

    res.status(200).json({ message: "Todo Deleted Successfully" });
  } catch (err) {
    console.error("Error", err.message);
    res.status(400).json({ message: err.message });
  }
};

exports.markAsComplete = async (req, res) => {
  try {
    const todoId = req.params.id;
    await todoService.markAsComplete(todoId);
    res.status(202).json({ message: "Todo Completed Successfully" });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};
