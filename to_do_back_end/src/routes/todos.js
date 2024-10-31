const express = require("express");
const router = express.Router();
const db = require("../config/database.js");

router.get("/", (req, res) => {
  db.query("SELECT * FROM todos", (err, result) => {
    if (err) {
      console.error("Database connection failed : ", err.stack);
      res.status(500).send("Database connection error");
      return;
    }
    res.json(result);
  });
});

router.post("/", (req, res) => {
  const { title, description } = req.body;
  const query = "INSERT INTO todos (title, description) VALUES (?, ?)";
  db.query(query, [title, description], (err, result) => {
    if (err) {
      console.error("Database insert failed:", err.stack);
      res.status(500).send("Database insert error");
      return;
    }
    res.status(201).json({ id: result.insertId, title, description });
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const query = "UPDATE todos SET title = ?, description = ? WHERE id = ?";
  db.query(query, [title, description, id], (err, result) => {
    if (err) {
      console.error("Database update failed:", err.stack);
      res.status(500).send("Database update error");
      return;
    }
    res.status(200).json({ id, title, description });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM todos WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Database delete failed:", err.stack);
      res.status(500).send("Database delete error");
      return;
    }
    res
      .status(200)
      .json({ message: `Todo with ID ${id} deleted successfully.` });
  });
});
module.exports = router;
