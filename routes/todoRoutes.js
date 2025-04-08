const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoControllers');

// GET - Home page with all todos
router.get('/', todoController.getAllTodos);

// POST - Create a new todo
router.post('/todos', todoController.createTodo);

// GET - Get a single todo (for AJAX editing)
router.get('/todos/:id', todoController.getTodoById);

// PUT - Update a todo
router.put('/todos/:id', todoController.updateTodo);

// PATCH - Toggle todo completion status
router.patch('/todos/:id/toggle', todoController.toggleTodoStatus);

// DELETE - Delete a todo
router.delete('/todos/:id', todoController.deleteTodo);

module.exports = router;