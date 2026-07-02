// Written By: Yasin Versiani

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const { handleMessage } = require("./engine");
const { handleSocketEvents } = require("./socketHandler");
const { loadCarData } = require("./dataLoader");
loadCarData();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

app.use(express.json());

// serves the frontend
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.set("Cache-Control", "no-store");
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});



io.on("connection", (socket) => {
  console.log("user connected " + socket.id);
  handleSocketEvents(socket, io);

  socket.on("disconnect", () => {
    console.log("User left " + socket.id);
  });
});

// listen's on port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

