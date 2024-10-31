const express = require("express");
const app = express();
const port = 3000;
const todosRouter = require("./src/routes/todos");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Kết nối database thành công ");
});
app.use("/todos", todosRouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
