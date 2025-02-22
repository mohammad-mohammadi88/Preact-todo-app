import express from "express";
import { deleteTodoRoute, getTodoRoute, patchTodoRoute, postTodoRoute } from "../controllers/todos.js";

const router = express.Router();

router.get('/', getTodoRoute)
router.post('/newTodo', postTodoRoute)
router.delete('/deleteTodo/:id',deleteTodoRoute)
router.patch('/editTodo/:id',patchTodoRoute)

export default router