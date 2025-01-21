import express from "express";
  import { createServer } from "http";
  import { Server } from "socket.io";
  import cors from "cors";

  const app = express();
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Vite dev server
      methods: ["GET", "POST"],
    },
  });

  // Initialize 10x10 grid
  let grid = Array(10)
    .fill(null)
    .map(() => Array(10).fill(""));
  let playersOnline = 0;

  io.on("connection", (socket) => {
    playersOnline++;
    console.log(`A user connected: ${socket.id}`);
    io.emit("update-players", playersOnline);

    // Send the initial grid to the new user
    socket.emit("init", { grid, playersOnline });

    // Listen for block clicks
    socket.on("block-click", ({ row, col, char }) => {
      if (!grid[row][col]) {
        grid[row][col] = char;
        io.emit("update-grid", grid);
      }
    });

    // Handle user disconnect
    socket.on("disconnect", () => {
      playersOnline--;
      io.emit("update-players", playersOnline);
      console.log(`A user disconnected: ${socket.id}`);
    });
  });

  // Start the server
  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });