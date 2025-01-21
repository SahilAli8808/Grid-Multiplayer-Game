import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

const App = () => {
  const [grid, setGrid] = useState(Array.from({ length: 10 }, () => Array(10).fill('')));
  const [onlinePlayers, setOnlinePlayers] = useState(0);
  const [canUpdate, setCanUpdate] = useState(true);

  useEffect(() => {
    socket.on('updateGrid', (updatedGrid) => {
      setGrid(updatedGrid);
    });

    socket.on('updateOnlinePlayers', (count) => {
      setOnlinePlayers(count);
    });

    return () => {
      socket.off('updateGrid');
      socket.off('updateOnlinePlayers');
    };
  }, []);

  const handleBlockClick = (row, col) => {
    if (canUpdate && !grid[row][col]) {
      const char = prompt('Enter a Unicode character:');
      if (char) {
        socket.emit('updateBlock', { row, col, char });
        setCanUpdate(false);
        setTimeout(() => setCanUpdate(true), 60000); // 1-minute restriction
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Real-Time Grid Game</h1>
      <p className="mb-2">Online Players: {onlinePlayers}</p>
      <div className="grid grid-cols-10 gap-1">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleBlockClick(rowIndex, colIndex)}
              className={`w-12 h-12 flex items-center justify-center border bg-white text-xl font-bold cursor-pointer`}
            >
              {cell}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;