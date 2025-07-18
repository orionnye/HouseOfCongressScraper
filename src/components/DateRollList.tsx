import React from 'react';
import axios from 'axios';

const DateRollList: React.FC<{ dates: string[], rolls: string[] }> = ({ dates, rolls }) => {
  const handleFetchHtml = async () => {
    try {
      const response = await axios.get('http://localhost:5000/fetch-vote-html');
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching HTML:', error);
    }
  };

  return (
    <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#e0e0e0', borderRadius: '5px' }}>
      <h3 style={{ fontSize: '16px' }}>Date and Roll List</h3>
      <ul>
        {dates.map((date, index) => (
          <li key={index}>
            <strong>Date:</strong> {date}, <strong>Roll:</strong> {rolls[index]}
          </li>
        ))}
      </ul>
      <button onClick={handleFetchHtml} style={{ marginTop: '10px', padding: '5px 10px' }}>Fetch Vote HTML</button>
    </div>
  );
};

export default DateRollList; 