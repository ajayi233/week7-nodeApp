// const todoModel = require("../models/todoModel");
const todoServices = require("../services/todoService");

const todoController = {
  // Get all todos and render index page
  getAllTodos: async (req, res) => {
    const todos = await todoServices.getAllTodos();

    // Group todos by completion status
    const activeTodos = todos.filter((todo) => !todo.isCompleted);
    const completedTodos = todos.filter((todo) => todo.isCompleted);

    res.render("index", {
      activeTodos,
      completedTodos,
      totalActive: activeTodos.length,
      totalCompleted: completedTodos.length,
    });
  },

  // Create a new todo
  createTodo: async (req, res) => {
    const { title, description, priority } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" });
    }

    // todoModel.addTodo({ title, description, priority });
    await todoServices.createTodo({ title, description, priority });
    res.redirect("/");
  },

  // Get single todo for editing
  getTodoById: async (req, res) => {
    const todoId = req.params.id;
    const todo = await todoServices.getTodoById(todoId);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(todo);
  },

  // Update a todo
  updateTodo: async (req, res) => {
    const todoId = req.params.id;
    const todoData = req.body;

    const updatedTodo = await todoServices.updateTodo(todoId, todoData);

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.redirect("/");
  },

  // Toggle todo completion status
  toggleTodoStatus: async (req, res) => {
    const todoId = req.params.id;
    const updatedTodo = await todoServices.toggleTodoStatus(todoId);

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.redirect("/");
  },

  // Delete a todo
  deleteTodo: async (req, res) => {
    const todoId = req.params.id;
    const isDeleted = await todoServices.deleteTodo(todoId);

    if (!isDeleted) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.redirect("/");
  },
};

module.exports = todoController;
