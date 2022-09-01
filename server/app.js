const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

dotenv.config({
  path: "./config.env",
});

require("./db/conn");
//const User = require("./model/user");

app.use(express.json());

//To link the router files
app.use(require("./router/auth"));

const PORT = process.env.PORT;

//Middlewares
const middleware = (req, res, next) => {
  console.log("My middleware");
  next();
};

// app.get("/", (req, res) => {
//   res.send("Hello World from the server from app");
// });

app.get("/about", middleware, (req, res) => {
  res.send("About Me page from the server");
});

// app.get("/login", (req, res) => {
//   res.send("Login from server");
// });

app.listen(PORT, () => {
  console.log("Server is running at port PORT");
});
