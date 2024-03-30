import React from 'react';

const SessionCounter = ({ count }) => {
  return (
    <div className="session-counter">
      <p>Completed sessions: {count}</p>
    </div>
  );
};

export default SessionCounter;