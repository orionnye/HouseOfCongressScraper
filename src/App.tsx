import React, { useState } from 'react';
import PullUrlButton from './components/PullUrlButton';
import UserInputs from './components/UserInputs';
import FileList from './components/FileList';
import Analytics from './components/Analytics';

function App() {
  const [date, setDate] = useState('2012');
  const [roll, setRoll] = useState('100');
  const [rawXml, setRawXml] = useState('');

  const handleFileFocus = (focusedRawXml: string) => {
    setRawXml(focusedRawXml);
  };

  return (
    <div className="App" style={{ transition: 'height 1s ease-in-out, width 1s ease-in-out' }}>
      <h1>Legislation Scraper</h1>
      <div style={{ display: 'flex', gap: '10px', height: '100vh', transition: 'height 1s ease-in-out, width 1s ease-in-out' }}>
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <UserInputs date={date} setDate={setDate} roll={roll} setRoll={setRoll} />
          <PullUrlButton date={date} roll={roll} />
          <FileList onFileFocus={(rawXml) => handleFileFocus(rawXml)} />
        </div>
        <div style={{ flex: '2', display: 'flex', flexDirection: 'column', flexGrow: 2 }}>
          <Analytics rawXml={rawXml} />
        </div>
      </div>
    </div>
  );
}

export default App;