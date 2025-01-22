import { Server, Socket } from 'socket.io';
import { GameService } from '../services/gameService.js';

// Define an interface for the data passed in 'updateBlock'
interface BlockUpdateData {
  row: number;
  col: number;
  char: string;
}

export const handleSocketConnections = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('A player connected:', socket.id);
    GameService.increasePlayerCount();
    io.emit('updateOnlinePlayers', GameService.getOnlinePlayers());

    // Send the current grid state to the connected player
    socket.emit('updateGrid', GameService.getGridState());

    socket.on('updateBlock', ({ row, col, char }: BlockUpdateData) => {
      const updatedGrid = GameService.updateBlock(row, col, char);
      io.emit('updateGrid', updatedGrid); // Broadcast updated grid to all players
    });

    socket.on('disconnect', () => {
      console.log('A player disconnected:', socket.id);
      GameService.decreasePlayerCount();
      io.emit('updateOnlinePlayers', GameService.getOnlinePlayers());
    });
  });
};
