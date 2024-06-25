const express = require("express");
const app = express();
const cors = require("cors");
require("./db");
require("dotenv").config();
const port = process.env.port;

app.use(cors());
app.use(express.json());
app.use("/api/user", require("./routes/user"));
app.use("/api/playlist", require("./routes/playlist"));

app.listen(port, () => {
  console.log(`Port: ${port}`);
});
