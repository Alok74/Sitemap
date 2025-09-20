const express = require("express");
const app = express();
require("dotenv").config();
const linkRoutes= require("./routes/route")
const dbConnect = require("./congfig/database")
const PORT = process.env.PORT ||4000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Server connected successfully</h1>");
});
app.use("/edzy", linkRoutes);
dbConnect();
app.listen(PORT, () => {
  console.log(`Server is running at Port ${PORT}`);
});

module.exports = app;
