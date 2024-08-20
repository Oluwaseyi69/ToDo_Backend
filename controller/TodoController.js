const todoService = require('../services/TodoService')

exports.createTodo = async (req, res) => {
  console.log("Controller: Create Todo Method Hit");
  console.log("Request Body:", req.body);
  console.log("Request User:", req.user);

  try {
    const todoData = req.body;
    console.log("TodoData", todoData);
    const userId = req.user.userId;
    console.log("UserId", userId);

    const todoResponse = await todoService.createTodo({ ...todoData, userId });
    console.log("TodoResponse", todoResponse);

    console.log("Todo Title:", todoData.title);

    res.status(201).json({ message: 'Todo created successfully', todoResponse });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

exports.viewAll = async () => {
  console.log("Controller: View All Todos Method Hit");

  try {
    const todos = await todoService.viewAllTodos();
    console.log("Todos", todos);
    return ({ message: 'Todos retrieved successfully', todos });
  } catch (err) {
    console.error(err.message);
    throw new Error({ message: err.message });
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

    res.status(200).json({ message: 'Todo updated successfully', updatedTodo });
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

    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (err) {
    console.error("Error", err.message);
    res.status(400).json({ message: err.message });
  }
};




