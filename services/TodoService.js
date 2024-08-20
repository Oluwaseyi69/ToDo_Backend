const Todo = require('../model/TodoModel')

const createTodo = async (todoData) =>{
  try {
    
      const createdDate = new Date();
      
      const dueDate = new Date(todoData.dueDate);
  
      if (dueDate <= createdDate) {
        throw new Error('Due date must be greater than the created date');
      }

    const todo = new Todo({
        title: todoData.title,
        description: todoData.description,
        dueDate: dueDate,
        userId: todoData.userId,
    });
    const savedTodo = await todo.save();
    return savedTodo;
    
  } catch (error) {
     throw new Error (error.message);
  }
}

const viewAllTodos = async () => {
  try {
    const todos = await Todo.find({});
    return todos;
  } catch (error) {
    throw new Error(error.message);
  }
};


const updateTodo = async (todoId, updatedData) => {
  console.log("i am at service");
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(todoId, updatedData, { new: true });
    if (!updatedTodo) {
      throw new Error('Todo not found');
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
      throw new Error('Todo not found');
    }

    return result;
  } catch (err) {
    console.error("Service Error", err.message);
    throw new Error('Error deleting todo');
  }
};

module.exports = {
  createTodo,
  viewAllTodos,
  updateTodo,
  deleteTodo
}