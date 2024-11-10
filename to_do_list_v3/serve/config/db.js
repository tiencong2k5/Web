const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todolist_app",
});

db.connect((err) => {
  if (err) return console.error("Database connection failed :", err.stack);
  console.log("Database connection successfully :", db.threadId);
});

module.exports = db;
