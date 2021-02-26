require("dotenv").config();

const express = require("express");
const server = new express();

const userRouter = require("./services/users");

server.use(express.json());

server.get("/test", (req, res) => {
  res.status(200).send({ message: "Test success" });
});

server.use("/users", userRouter);

module.exports = server;
