const express = require('express');
const router = express.Router();
const todoController = require('../controller/TodoController');
const authMiddleware = require('../midddleware/Auth');

router.post('/createTodo', authMiddleware.authenticate, todoController.createTodo);
router.get('/viewAll', authMiddleware.authenticate, todoController.viewAll);
router.put('/updateTodo/:id', authMiddleware.authenticate, todoController.updateTodo);
router.delete('/deleteTodo/:id', authMiddleware.authenticate, todoController.deleteTodo);

module.exports = router;
