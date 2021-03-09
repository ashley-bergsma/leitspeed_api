const express = require("express");

const cardsRouter = require("./users/cards-router");
const usersRouter = require("./users/users-router");
const topicsRouter = require("./users/topics-router");

const server = express();

//* use JSON //
server.use(express.json());

//* "Plug in" the routers here
server.use("/cards", cardsRouter);
server.use("/users", usersRouter);
server.use("/topics", topicsRouter);

//* base endpoint
server.get("/", (req, res) => {
	res.status(200).json({ message: "Up and Running..." });
});

//! Gotcha!
// I forgot to export this module, and couldn't figure out why my server wasn't running!
module.exports = server;
