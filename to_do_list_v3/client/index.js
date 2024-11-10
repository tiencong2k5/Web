const express = require("express");

const todoRouter = require("./");

const app = express();
const port = 3000;

app.use(express.json()); // Giúp parse dữ liệu JSON
app.use("/todos", todoRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
