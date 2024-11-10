const db = require("../config/db");

const todoModel = {
  getAll: (callback) => {
    db.query(
      "SELECT id, content, DATE_FORMAT(deadline, '%Y-%m-%d') as deadline, completed FROM todolist",
      callback
    );
  },

  create: (content, deadline, callback) => {
    const formattedDueDate = new Date(deadline).toISOString().split("T")[0];
    db.query(
      "INSERT INTO todolist(content, deadline) VALUES (?, ?)",
      [content, formattedDueDate],
      callback
    );
  },

  update: (id, content, deadline, completed, callback) => {
    const formattedDueDate = new Date(deadline).toISOString().split("T")[0];
    db.query(
      "UPDATE todolist SET content = ?, deadline = ?, completed = ? WHERE id = ?",
      [content, formattedDueDate, completed, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM todolist WHERE id = ? ", [id], callback);
  },
};
module.exports = todoModel;
