import React from 'react';

const Grid = ({ grid, handleBlockClick, canUpdate }) =>{
  // console.log(grid, handleBlockClick,canUpdate )

 return (

  <div
    className={`grid grid-cols-10 gap-2 ${
      !canUpdate ? 'pointer-events-none opacity-50' : ''
    }`}
    title={!canUpdate ? 'Update restricted' : ''}
  >
    {grid.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        // console.log(rowIndex-colIndex)
        
        <div
          key={`${rowIndex}-${colIndex}`}

          onClick={() => handleBlockClick(rowIndex, colIndex)}
          className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg ${
            cell
              ? 'bg-black text-white'
              : 'bg-white text-gray-800 hover:bg-gray-200'
          } font-bold shadow-md transition-all duration-300 cursor-pointer`}
        >
           {/* {String(rowIndex - colIndex)} */}
          {cell}
        </div>
      ))
    )}
  </div>
)};

export default Grid;
