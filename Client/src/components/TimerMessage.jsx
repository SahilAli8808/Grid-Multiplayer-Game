import React from 'react';

const TimerMessage = ({ timer, canUpdate }) => (
  timer > 0 && !canUpdate && (
    <p className="text-red-600 font-semibold text-lg mb-4">
      You can play again in {timer}s
    </p>
  )
);

export default TimerMessage;
