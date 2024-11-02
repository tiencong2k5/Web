const todoModel = require("../models/todoModel");

exports.getAllToDo = (req, res) => {
  todoModel.getAll((err, results) => {
    if (err)
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
        error: err.message, // Chỉ truyền phần message để tránh lộ chi tiết nhạy cảm
      });
    res.status(200).json(results);
  });
};

exports.createToDo = (req, res) => {
  const { title, due_date } = req.body;
  todoModel.create(title, due_date, (err, results) => {
    if (err)
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
        error: err.message,
      });
    res.status(201).json({ message: "Todo created successfully" });
  });
};

exports.updateToDo = (req, res) => {
  const { id } = req.params;
  const { title, due_date, completed } = req.body;
  todoModel.update(id, title, due_date, completed, (err, results) => {
    if (err)
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
        error: err.message,
      });
    res.status(200).json({ message: "Todo updated successfully" });
  });
};

exports.deleteToDo = (req, res) => {
  const { id } = req.params;
  todoModel.delete(id, (err, results) => {
    if (err)
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
        error: err.message,
      });
    res.status(200).json({ message: "Todo delete successfully" });
  });
};
