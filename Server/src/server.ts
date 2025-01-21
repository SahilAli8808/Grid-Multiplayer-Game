const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());

const PORT = 3000;
// Initialize 10x10 grid with empty strings
let gridState = Array.from({ length: 10 }, () => Array(10).fill(''));
let onlinePlayers = 0;

io.on('connection', (socket) => {
  console.log('A player connected:', socket.id);
  onlinePlayers++;

  // Notify all players about the updated online count
  io.emit('updateOnlinePlayers', onlinePlayers);

  // Send the current grid state to the connected player
  socket.emit('updateGrid', gridState);

  // Handle block update
  socket.on('updateBlock', ({ row, col, char }) => {
    if (!gridState[row][col]) {
      gridState[row][col] = char;
      io.emit('updateGrid', gridState); // Broadcast updated grid to all players
    }
  });

  socket.on('disconnect', () => {
    console.log('A player disconnected:', socket.id);
    onlinePlayers--;
    io.emit('updateOnlinePlayers', onlinePlayers);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});