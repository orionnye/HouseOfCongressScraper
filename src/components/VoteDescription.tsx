import React, { useEffect, useState } from 'react';

const VoteDescription: React.FC<{ rawXml: string }> = ({ rawXml }) => {
  const [description, setDescription] = useState('');
  const [legisNum, setLegisNum] = useState('');
  const [voteQuestion, setVoteQuestion] = useState('');
  const [voteResult, setVoteResult] = useState('');
  const [amendmentNum, setAmendmentNum] = useState('');
  const [amendmentAuthor, setAmendmentAuthor] = useState('');
  const [actionDate, setActionDate] = useState('');
  const [actionTime, setActionTime] = useState('');

  useEffect(() => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(rawXml, 'text/xml');
    const voteDescElement = xmlDoc.querySelector('vote-desc');
    const legisNumElement = xmlDoc.querySelector('legis-num');
    const voteQuestionElement = xmlDoc.querySelector('vote-question');
    const voteResultElement = xmlDoc.querySelector('vote-result');
    const amendmentNumElement = xmlDoc.querySelector('amendment-num');
    const amendmentAuthorElement = xmlDoc.querySelector('amendment-author');
    const actionDateElement = xmlDoc.querySelector('action-date');
    const actionTimeElement = xmlDoc.querySelector('action-time');

    const desc = voteDescElement && voteDescElement.textContent ? voteDescElement.textContent : 'No description available';
    const legisNum = legisNumElement && legisNumElement.textContent ? legisNumElement.textContent : 'N/A';
    const voteQuestion = voteQuestionElement && voteQuestionElement.textContent ? voteQuestionElement.textContent : 'N/A';
    const voteResult = voteResultElement && voteResultElement.textContent ? voteResultElement.textContent : 'N/A';
    const amendmentNum = amendmentNumElement && amendmentNumElement.textContent ? amendmentNumElement.textContent : 'N/A';
    const amendmentAuthor = amendmentAuthorElement && amendmentAuthorElement.textContent ? amendmentAuthorElement.textContent : 'N/A';
    const actionDate = actionDateElement && actionDateElement.textContent ? actionDateElement.textContent : 'N/A';
    const actionTime = actionTimeElement && actionTimeElement.textContent ? actionTimeElement.textContent : 'N/A';

    setDescription(desc);
    setLegisNum(legisNum);
    setVoteQuestion(voteQuestion);
    setVoteResult(voteResult);
    setAmendmentNum(amendmentNum);
    setAmendmentAuthor(amendmentAuthor);
    setActionDate(actionDate);
    setActionTime(actionTime);
  }, [rawXml]);

  return (
    <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px', fontSize: '14px' }}>
      {/* <h3 style={{ fontSize: '16px' }}>Vote Description</h3> */}
      <p><strong>Description:</strong> {description}</p>
      <p><strong>Legislation Number:</strong> {legisNum}</p>
      <p><strong>Vote Question:</strong> {voteQuestion}</p>
      <p><strong>Vote Result:</strong> {voteResult}</p>
      <p><strong>Amendment Number:</strong> {amendmentNum}</p>
      <p><strong>Amendment Author:</strong> {amendmentAuthor}</p>
      <p><strong>Action Date & Time:</strong> {actionDate} {actionTime}</p>
    </div>
  );
};

export default VoteDescription; 