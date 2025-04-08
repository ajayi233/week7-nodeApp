const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  toggleTodoStatus,
  deleteTodo,
} = require("../controllers/todo");

router.get("/", getAllTodos);
router.get("/:id", getTodoById);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.patch("/:id/toggle", toggleTodoStatus);
router.delete("/:id", deleteTodo);

module.exports = router;
