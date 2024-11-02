const db = require("../config/db");

const todoModel = {
  getAll: (callback) => {
    db.query("SELECT * FROM todolist", callback);
  },
  create: (title, due_date, callback) => {
    db.query(
      "INSERT INTO todolist(title, due_date)  VALUES (? , ?)",
      [title, due_date],
      callback
    );
  },
  update: (id, title, due_date, completed, callback) => {
    db.query(
      "UPDATE todolist SET title = ? , due_date = ? , completed = ? WHERE id = ?",
      [title, due_date, completed, id],
      callback
    );
  },
  delete: (id, callback) => {
    db.query("DELETE FROM todolist WHERE id = ? ", [id], callback);
  },
};
module.exports = todoModel;
