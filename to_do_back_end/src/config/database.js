const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todolist_app",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed : ", err.stack);
    return;
  }
  console.log("Connect to MySQL database : " + db.threadId);
});

module.exports = db;
