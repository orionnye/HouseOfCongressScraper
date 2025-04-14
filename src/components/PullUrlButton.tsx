import React from 'react';
import UserInputs from './UserInputs';

const PullUrlButton: React.FC<{
  date: string;
  roll: string;
}> = ({ date, roll }) => {
  const handleClick = async () => {
    try {
      const fileName = `${date}roll${roll}.xml`;
      const response = await fetch(`http://localhost:5000/check-file?fileName=${fileName}`);
      const fileExists = await response.json();

      if (fileExists.exists) {
        console.log(`File already exists: ${fileName}`);
      } else {
        const scrapeResponse = await fetch(`http://localhost:5000/scrape-data?date=${date}&roll=${roll}`);
        const text = await scrapeResponse.text();
        console.log(text);
      }

      console.log('Button pressed: pull url to local file');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>pull url to local file</button>
    </div>
  );
};

export default PullUrlButton; 