import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Grid from "./components/Grid";

const App = () => {
  const [grid, setGrid] = useState(Array(10).fill(Array(10).fill("")));
  const [playersOnline, setPlayersOnline] = useState(0);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    newSocket.on("init", (data) => {
      setGrid(data.grid);
      setPlayersOnline(data.playersOnline);
    });

    newSocket.on("update-grid", (updatedGrid) => {
      setGrid(updatedGrid);
    });

    newSocket.on("update-players", (count) => {
      setPlayersOnline(count);
    });

    return () => newSocket.disconnect();
  }, []);

  const handleBlockClick = (row, col) => {
    if (socket) {
      socket.emit("block-click", { row, col, char: "★" });
    }
  };

  return (
    <div>
      <h1>Real-Time Multiplayer Grid</h1>
      <p>Players Online: {playersOnline}</p>
      <Grid grid={grid} onBlockClick={handleBlockClick} />
    </div>
  );
};

export default App;
