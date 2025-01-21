import React, { useState } from "react";
import Grid from "./components/Grid";

const App = () => {
  const initialGrid = Array(10).fill(Array(10).fill("")); // 10x10 grid
  const [grid, setGrid] = useState(initialGrid);

  const handleBlockClick = (row, col) => {
    const newGrid = grid.map((rowArr, rowIndex) =>
      rowArr.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? "★" : cell
      )
    );
    setGrid(newGrid);
  };

  return (
    <div>
      <h1>Real-Time Multiplayer Grid</h1>
      <Grid grid={grid} onBlockClick={handleBlockClick} />
    </div>
  );
};

export default App;
