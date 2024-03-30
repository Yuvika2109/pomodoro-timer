import React from 'react';

const Settings = ({ workDuration, breakDuration, onChange }) => {
  return (
    <div className="settings">
      <label>
        Work duration (minutes):
        <input type="number" value={workDuration} onChange={(e) => onChange('work', e.target.value)} />
      </label>
      <label>
        Break duration (minutes):
        <input type="number" value={breakDuration} onChange={(e) => onChange('break', e.target.value)} />
      </label>
    </div>
  );
};

export default Settings;