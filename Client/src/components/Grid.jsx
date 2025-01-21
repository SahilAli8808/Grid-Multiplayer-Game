import React from "react";

const Grid = ({ grid, onBlockClick }) => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)" }}>
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            onClick={() => onBlockClick(rowIndex, colIndex)}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              textAlign: "center",
              cursor: cell ? "not-allowed" : "pointer",
              backgroundColor: cell ? "#e0e0e0" : "#fff",
            }}
          >
            {cell}
          </div>
        ))
      )}
    </div>
  );
};

export default Grid;
