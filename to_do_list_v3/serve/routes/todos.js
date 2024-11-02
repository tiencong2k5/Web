const express = require("express");
const router = express.Router();

const todoController = require("../controllers/todoControlller");
// HTTP todo
router.get("/todos", todoController.getAllToDo);
router.post("/todos", todoController.createToDo);
router.put("/todos/:id", todoController.updateToDo);
router.delete("/todos/:id", todoController.deleteToDo);
// API sign in
module.exports = router;
