import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { handleSocketConnections } from './utils/socketUtils.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

// Start socket handling
handleSocketConnections(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
