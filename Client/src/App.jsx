import React, { useEffect, useState } from 'react';
import { Theme } from '@radix-ui/themes';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';
import Header from './components/Header';
import CalloutMessage from './components/CalloutMessage';
import OnlinePlayers from './components/OnlinePlayers';
import Grid from './components/Grid';
import TimerMessage from './components/TimerMessage';

const socket = io(import.meta.env.VITE_BACKEND_URL);

const App = () => {
  const [grid, setGrid] = useState(Array.from({ length: 10 }, () => Array(10).fill('')));
  const [onlinePlayers, setOnlinePlayers] = useState(0);
  const [canUpdate, setCanUpdate] = useState(true);
  const [timer, setTimer] = useState(0);
  const [theme, setTheme] = useState('light');
  const popSound = new Audio('/popsound.mp3');

  useEffect(() => {
    socket.on('updateGrid', (updatedGrid) => setGrid(updatedGrid));
    socket.on('updateOnlinePlayers', (count) => setOnlinePlayers(count));

    return () => {
      socket.off('updateGrid');
      socket.off('updateOnlinePlayers');
    };
  }, []);

  const handleBlockClick = (row, col) => {
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

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <Theme appearance={theme}>
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <CalloutMessage message="I am using the free tier of Render, so the server may take some time to wake up." />
        <OnlinePlayers count={onlinePlayers} />
        <TimerMessage timer={timer} canUpdate={canUpdate} />
        <Grid grid={grid} handleBlockClick={handleBlockClick} canUpdate={canUpdate} />
      </div>
    </Theme>
  );
};

export default App;
