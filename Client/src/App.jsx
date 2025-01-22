import React, { useEffect, useState } from 'react';
import { Theme, Callout, Badge, Heading, Text } from '@radix-ui/themes';
import toast from 'react-hot-toast';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { GrGrid } from "react-icons/gr";
import { HiUsers } from "react-icons/hi2";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_BACKEND_URL);

const App = () => {
  // console.log('Backend URL:', import.meta.env.VITE_BACKEND_URL);
  const [grid, setGrid] = useState(Array.from({ length: 10 }, () => Array(10).fill('')));
  const [onlinePlayers, setOnlinePlayers] = useState(0);
  const [canUpdate, setCanUpdate] = useState(true);
  const [timer, setTimer] = useState(0);
  const [theme, setTheme] = useState('light'); // Track the current theme

  // Load the pop sound
  const popSound = new Audio('/popsound.mp3');

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
      // Play the pop sound
      popSound.play();
    if (canUpdate && !grid[row][col]) {
      const char = prompt('Enter a Unicode character:');
      if (char) {
      

        socket.emit('updateBlock', { row, col, char });
        setCanUpdate(false);
        setTimer(60);

        toast.success('You played a move, wait for other players to play');

        const countdown = setInterval(() => {
          setTimer((prev) => {
            if (prev <= 1) {
              clearInterval(countdown);
              setCanUpdate(true);
            }
            return prev - 1;
          });
        }, 1000);
      }
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <Theme appearance={theme}>
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="flex items-center justify-between max-w-xl mb-2">
          <Heading>
            <GrGrid className="inline" /> Real-Time Grid Game
          </Heading>
          <button
            onClick={toggleTheme}
            className="p-2"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <SunIcon className="ml-4" /> : <MoonIcon className="ml-4" />}
          </button>
        </div>

        <Callout.Root>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            I am using the free tier of Render, so the server may take some time to wake up.
          </Callout.Text>
        </Callout.Root>

        <Text className="font-medium mb-4 mt-2">
          <HiUsers className="inline" /> Online: <Badge color="green">{onlinePlayers} Players</Badge>
        </Text>

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
    </Theme>
  );
};

export default App;
