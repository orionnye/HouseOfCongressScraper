import React from 'react';

const UserInputs: React.FC<{
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  roll: string;
  setRoll: React.Dispatch<React.SetStateAction<string>>;
}> = ({ date = '2012', setDate, roll = '100', setRoll }) => {
  return (
    <div>
      <input type="text" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" />
      <input type="text" value={roll} onChange={(e) => setRoll(e.target.value)} placeholder="Roll" />
    </div>
  );
};

export default UserInputs; 