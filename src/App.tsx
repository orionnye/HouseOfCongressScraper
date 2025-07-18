import React, { useState } from 'react';
import PullUrlButton from './components/PullUrlButton';
import UserInputs from './components/UserInputs';
import FileList from './components/FileList';
import Analytics from './components/Analytics';
import DateRollList from './components/DateRollList';

function App() {
  const [date, setDate] = useState('2012');
  const [roll, setRoll] = useState('100');
  const [rawXml, setRawXml] = useState('');

  const handleFileFocus = (focusedRawXml: string) => {
    setRawXml(focusedRawXml);
  };

  return (
    <div className="App" style={{ transition: 'height 1s ease-in-out, width 1s ease-in-out' }}>
      <h1 style={{ fontSize: '24px' }}>Legislation Scraper</h1>
      <div style={{ display: 'flex', gap: '10px', height: '100vh', transition: 'height 1s ease-in-out, width 1s ease-in-out' }}>
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <DateRollList dates={["2021-01-01", "2021-01-02"]} rolls={["101", "102"]} />
          <UserInputs date={date} setDate={setDate} roll={roll} setRoll={setRoll} />
          <PullUrlButton date={date} roll={roll} />
          <FileList onFileFocus={(rawXml) => handleFileFocus(rawXml)} />
        </div>
        <div style={{ flex: '2', display: 'flex', flexDirection: 'column', flexGrow: 2, position: 'sticky', top: '0', height: '100vh' }}>
          <Analytics rawXml={rawXml} />
        </div>
      </div>
    </div>
  );
}

export default App;