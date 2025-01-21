import React from 'react';

const Grid = ({ grid, onBlockClick, disableInteraction }) => {
  return (
    <div className="grid grid-cols-10 gap-1">
      {grid.map((row, x) =>
        row.map((block, y) => (
          <button
            key={`${x}-${y}`}
            className={`p-4 border ${block.character ? 'bg-gray-200' : 'bg-white'}`}
            onClick={() => onBlockClick(x, y)}
            disabled={!!block.character || disableInteraction}
          >
            {block.character || ''}
          </button>
        ))
      )}
    </div>
  );
};

export default Grid;
