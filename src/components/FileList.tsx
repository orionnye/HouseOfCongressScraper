import React, { useEffect, useState } from 'react';
import VoteResults from './VoteResults';
import './FileList.css';

const FileList: React.FC<{ onFileFocus: (rawXml: string) => void }> = ({ onFileFocus }) => {
  const [files, setFiles] = useState<{ file: string; voteDesc: string; rawXml: string }[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('http://localhost:5000/files');
        const fileList = await response.json();

        const filesWithDescriptions = await Promise.all(fileList.map(async (file: string) => {
          const fileResponse = await fetch(`http://localhost:5000/data/${file}`);
          const fileText = await fileResponse.text();
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(fileText, 'text/xml');
          const voteDesc = xmlDoc.getElementsByTagName('vote-desc')[0]?.textContent || 'No description';

          return { file, voteDesc, rawXml: fileText };
        }));

        setFiles(filesWithDescriptions);
      } catch (error) {
        console.error('Error fetching file list:', error);
      }
    };

    fetchFiles();

    const intervalId = setInterval(fetchFiles, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div>
      <h2>Files in Data Folder</h2>
      <ul>
        {files.map(({ file, voteDesc, rawXml }, index) => (
          <li key={index} onClick={() => onFileFocus(rawXml)} className="clickable-item">
            {file}
            {/* {file} - {voteDesc} */}
            {/* <VoteResults voteResults={voteResults} /> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList; 