import express from "express";

import { createServer } from "http";

import { Server } from "socket.io";

const app = express();

const server = createServer(app); // Create an HTTP server

const io = new Server(server); // Attach Socket.IO to the server

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/index.html"); // Ensure correct directory resolution
});

// Listen for new socket connections
io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
