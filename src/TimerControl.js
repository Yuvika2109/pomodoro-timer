import React from 'react';

const TimerControl = ({ onStart, onPause, onReset }) => {
  return (
    <div className="timer-control">
      <button onClick={onStart}>Start</button>
      <button onClick={onPause}>Pause</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
};

export default TimerControl;