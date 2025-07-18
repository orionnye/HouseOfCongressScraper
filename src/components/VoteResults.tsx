import React, { useEffect, useState } from 'react';
import LegislatorList from './LegislatorList';

const VoteResults: React.FC<{ rawXml: string, onVoteDataCalculated: (data: { partyVoteCounts: { [key: string]: number }, votePartyCounts: { [key: string]: { yea: number, nay: number, notVoting: number } } }) => void }> = ({ rawXml, onVoteDataCalculated }) => {
  const [legislatorsByVoteType, setLegislatorsByVoteType] = useState<{
    yea: { name: string; color: string }[];
    nay: { name: string; color: string }[];
    notVoting: { name: string; color: string }[];
  }>({ yea: [], nay: [], notVoting: [] });

  const [partyVoteCounts, setPartyVoteCounts] = useState<{ [key: string]: number }>({ D: 0, R: 0, I: 0, other: 0 });

  const partyColors: { [key: string]: string } = {
    D: 'var(--color-democrat)',
    R: 'var(--color-republican)',
    I: 'var(--color-independent)',
    other: 'var(--color-other)'
  };

  const [votePartyCounts, setVotePartyCounts] = useState<{
    [key: string]: { yea: number; nay: number; notVoting: number }
  }>({ D: { yea: 0, nay: 0, notVoting: 0 }, R: { yea: 0, nay: 0, notVoting: 0 }, I: { yea: 0, nay: 0, notVoting: 0 }, other: { yea: 0, nay: 0, notVoting: 0 } });

  const [isExpanded, setIsExpanded] = useState({ yea: false, nay: false, notVoting: false });

  useEffect(() => {
    console.log('Parsing XML and calculating vote data');
    // Parse rawXml and organize legislators by vote type
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(rawXml, 'text/xml');
    const voteTypes = { yea: ['yea', 'yes', 'aye'], nay: ['nay', 'no', 'uh-uh'], notVoting: ['not voting', 'absent'] };
    const newLegislatorsByVoteType: {
      yea: { name: string; color: string }[];
      nay: { name: string; color: string }[];
      notVoting: { name: string; color: string }[];
    } = { yea: [], nay: [], notVoting: [] };

    const newPartyVoteCounts: { [key: string]: number } = { D: 0, R: 0, I: 0, other: 0 };
    const newVotePartyCounts: {
      [key: string]: { yea: number; nay: number; notVoting: number }
    } = { D: { yea: 0, nay: 0, notVoting: 0 }, R: { yea: 0, nay: 0, notVoting: 0 }, I: { yea: 0, nay: 0, notVoting: 0 }, other: { yea: 0, nay: 0, notVoting: 0 } };

    Array.from(xmlDoc.getElementsByTagName('recorded-vote')).forEach((voteElement) => {
      const legislatorElement = voteElement.querySelector('legislator');
      const name = legislatorElement?.getAttribute('unaccented-name');
      const vote = voteElement.querySelector('vote')?.textContent?.toLowerCase();
      const party = legislatorElement?.getAttribute('party') || 'other';

      if (name && vote) {
        const color = partyColors[party] || partyColors.other;
        if (voteTypes.yea.includes(vote)) {
          newLegislatorsByVoteType.yea.push({ name, color });
          newVotePartyCounts[party].yea++;
        } else if (voteTypes.nay.includes(vote)) {
          newLegislatorsByVoteType.nay.push({ name, color });
          newVotePartyCounts[party].nay++;
        } else {
          newLegislatorsByVoteType.notVoting.push({ name, color });
          newVotePartyCounts[party].notVoting++;
        }
        newPartyVoteCounts[party]++;
      }
    });

    setLegislatorsByVoteType(newLegislatorsByVoteType);
    setPartyVoteCounts(newPartyVoteCounts);
    setVotePartyCounts(newVotePartyCounts);
    console.log('Calling onVoteDataCalculated with data:', { partyVoteCounts: newPartyVoteCounts, votePartyCounts: newVotePartyCounts });
    onVoteDataCalculated({ partyVoteCounts: newPartyVoteCounts, votePartyCounts: newVotePartyCounts });
  }, [rawXml]);

  const toggleExpand = (type: 'yea' | 'nay' | 'notVoting') => {
    setIsExpanded(prevState => ({ ...prevState, [type]: !prevState[type] }));
  };

  return (
    <div>
      {/* <h3>Total Votes by Party</h3>
      <ul>
        <li style={{ color: 'var(--color-democrat)' }}>Democrats: {partyVoteCounts.D}</li>
        <li style={{ color: 'var(--color-republican)' }}>Republicans: {partyVoteCounts.R}</li>
        <li style={{ color: 'var(--color-independent)' }}>Independents: {partyVoteCounts.I}</li>
        <li style={{ color: 'var(--color-other)' }}>Others: {partyVoteCounts.other}</li>
      </ul> */}
      {/* <h3>Votes by Party and Type</h3>
      <ul>
        <li style={{ color: 'var(--color-democrat)' }}>Democrats - Yea: {votePartyCounts.D.yea}, Nay: {votePartyCounts.D.nay}, Not Voting: {votePartyCounts.D.notVoting}</li>
        <li style={{ color: 'var(--color-republican)' }}>Republicans - Yea: {votePartyCounts.R.yea}, Nay: {votePartyCounts.R.nay}, Not Voting: {votePartyCounts.R.notVoting}</li>
        <li style={{ color: 'var(--color-independent)' }}>Independents - Yea: {votePartyCounts.I.yea}, Nay: {votePartyCounts.I.nay}, Not Voting: {votePartyCounts.I.notVoting}</li>
        <li style={{ color: 'var(--color-other)' }}>Others - Yea: {votePartyCounts.other.yea}, Nay: {votePartyCounts.other.nay}, Not Voting: {votePartyCounts.other.notVoting}</li>
      </ul> */}
      {/* <h3>Legislators by Vote Type</h3> */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <LegislatorList
          title="Yea"
          legislators={legislatorsByVoteType.yea}
          isExpanded={isExpanded.yea}
          toggleExpand={() => toggleExpand('yea')}
        />
        <LegislatorList
          title="Nay"
          legislators={legislatorsByVoteType.nay}
          isExpanded={isExpanded.nay}
          toggleExpand={() => toggleExpand('nay')}
        />
        <LegislatorList
          title="Not Voting"
          legislators={legislatorsByVoteType.notVoting}
          isExpanded={isExpanded.notVoting}
          toggleExpand={() => toggleExpand('notVoting')}
        />
      </div>
    </div>
  );
};

export default VoteResults; 