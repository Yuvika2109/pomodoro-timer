
 
import React, { useState, useEffect } from 'react';
import TimerDisplay from './TimerDisplay';
import Settings from './Settings';
import ProgressBar from './ProgressBar';
import SessionCounter from './SessionCounter';
import './App.css';
import calmingSound from './calmingSound.mp3'; // Import your calming sound file

const App = () => {
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [isWorking, setIsWorking] = useState(true);
  const [timerRunning, setTimerRunning] = useState(false);
  const [time, setTime] = useState(workDuration * 60);
  const [completedSessions, setCompletedSessions] = useState([]);
  const [initialTime, setInitialTime] = useState(workDuration * 60);
  const [audio] = useState(new Audio(calmingSound)); // Initialize audio object

  useEffect(() => {
    setInitialTime(isWorking ? workDuration * 60 : breakDuration * 60);
    setTime(isWorking ? workDuration * 60 : breakDuration * 60);
  }, [workDuration, breakDuration, isWorking]);

  useEffect(() => {
    if (timerRunning && time > 0) {
      const timerInterval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(timerInterval);
            handleTimeUp();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [timerRunning, time]);

  useEffect(() => {
    if (timerRunning) {
      audio.loop = true; // Loop the audio playback
      audio.play(); // Start audio playback
    } else {
      audio.pause(); // Pause audio playback
    }

    return () => {
      audio.pause(); // Pause audio playback when component unmounts
    };
  }, [timerRunning, audio]);

  const handleTimeUp = () => {
    const endTime = new Date().toLocaleString();
    const duration = initialTime - time;
    const sessionData = {
      startTime: endTime,
      endTime: endTime,
      duration: duration,
      workDuration: workDuration,
      breakDuration: breakDuration
    };
    setCompletedSessions([...completedSessions, sessionData]);
    setIsWorking(!isWorking);
    setTime(isWorking ? breakDuration * 60 : workDuration * 60);
  };

  const handleStart = () => {
    setTimerRunning(true);
  };

  const handlePause = () => {
    setTimerRunning(false);
  };

  const handleReset = () => {
    setTimerRunning(false);
    setTime(initialTime);
  };

  return (
    <div className="app">
      <h1>Your personalized Pomodoro Timer!</h1>
      <Settings
        workDuration={workDuration}
        breakDuration={breakDuration}
        onChange={(type, value) => {
          if (type === 'work') {
            setWorkDuration(value);
          } else {
            setBreakDuration(value);
          }
        }}
      />
      <TimerDisplay time={time} />
      <ProgressBar percentage={(time / initialTime) * 100} />
      <SessionCounter count={completedSessions.length} />
      <div className="controls">
        {!timerRunning ? (
          <button onClick={handleStart}>Start</button>
        ) : (
          <button onClick={handlePause}>Pause</button>
        )}
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default App;