import React from 'react';

const TimerDisplay = ({ time }) => {
  return (
    <div className="timer-display">
      <h1>{time}</h1>
    </div>
  );
};

export default TimerDisplay;