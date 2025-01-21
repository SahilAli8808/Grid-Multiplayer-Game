import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaUsersBetweenLines } from "react-icons/fa6";
import { GrGrid } from "react-icons/gr";
import { HiUsers } from "react-icons/hi2";
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

const App = () => {
  const [grid, setGrid] = useState(Array.from({ length: 10 }, () => Array(10).fill('')));
  const [onlinePlayers, setOnlinePlayers] = useState(0);
  const [canUpdate, setCanUpdate] = useState(true);
  const [timer, setTimer] = useState(0); // Add state for timer

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
        setTimer(60); // Set the timer to 60 seconds
        toast.success('You played a move , wait for other players to play');

        const countdown = setInterval(() => {
          setTimer((prev) => {
            if (prev <= 1) {
              clearInterval(countdown);
              setCanUpdate(true); // Allow updating again after restriction
            }
            return prev - 1;
          });
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-300 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6"> <GrGrid className='inline'/> Real-Time Grid Game</h1>
      <p className="text-lg font-medium text-gray-700 mb-4"><HiUsers className='inline' /> Online: <span className='text-green-600'>{onlinePlayers} Players </span> </p>
      {timer > 0 && !canUpdate && (
        <p className="text-red-600 font-semibold text-lg mb-4"> 
          You can play again in {timer}s
        </p>
      )}
      <div
        className={`grid grid-cols-10 gap-2 ${
          !canUpdate ? 'pointer-events-none opacity-50' : ''
        }`}
        title={!canUpdate ? 'Update restricted' : ''}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleBlockClick(rowIndex, colIndex)}
              className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg ${
                cell
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-800 hover:bg-gray-200'
              } font-bold shadow-md transition-all duration-300 cursor-pointer`}
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
