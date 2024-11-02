const express = require("express");
const bodyParser = require("body-parser");
const todoRouter = require("./routes/todos");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());
app.use("/api", todoRouter); // Sử dụng các route đã định nghĩa

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
