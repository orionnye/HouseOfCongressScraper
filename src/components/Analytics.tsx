import React, { useEffect, useState } from 'react';
import VoteResults from './VoteResults';
import CustomPieChartDisplay from './CustomPieChartDisplay';
import VoteDescription from './VoteDescription';

const Analytics: React.FC<{ rawXml: string }> = ({ rawXml }) => {
  const [voteData, setVoteData] = useState<{ partyVoteCounts: { [key: string]: number }, votePartyCounts: { [key: string]: { yea: number, nay: number, notVoting: number } } } | null>(null);

  const handleVoteDataCalculated = (data: { partyVoteCounts: { [key: string]: number }, votePartyCounts: { [key: string]: { yea: number, nay: number, notVoting: number } } }) => {
    // console.log('Received vote data:', data);
    setVoteData(data);
  };

  return (
    <div style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', width: '100%', padding: '20px', boxSizing: 'border-box', backgroundColor: '#d0d0d0', transition: 'height 1s ease-in-out, width 1s ease-in-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', transition: 'height 1s ease-in-out, width 1s ease-in-out' }}>
        {voteData && (
          <div style={{ flex: '1', padding: '10px' }}>
            <CustomPieChartDisplay style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }} data={{
              labels: ['Democrat Yea', 'Republican Yea', 'Democrat Nay', 'Republican Nay', 'Independent Yea', 'Independent Nay', 'Not Voting'],
              datasets: [
                {
                  data: [
                    voteData.votePartyCounts.D.yea,
                    voteData.votePartyCounts.R.yea,
                    voteData.votePartyCounts.D.nay,
                    voteData.votePartyCounts.R.nay,
                    voteData.votePartyCounts.I.yea, // Independent Yea
                    voteData.votePartyCounts.I.nay, // Independent Nay
                    voteData.votePartyCounts.D.notVoting + voteData.votePartyCounts.R.notVoting + voteData.votePartyCounts.I.notVoting + voteData.votePartyCounts.other.notVoting // Not Voting
                  ],
                  backgroundColor: [
                    '#4a90e2', // Democrat Yea
                    '#d9534f', // Republican Yea
                    '#4a90e2', // Democrat Nay
                    '#d9534f', // Republican Nay
                    '#5cb85c', // Independent Yea
                    '#5cb85c', // Independent Nay
                    '#6c757d' // Not Voting
                  ],
                  borderWidth: 1,
                },
              ],
            }} />
          </div>
        )}
        <div style={{ flex: '1', padding: '10px' }}>
          <VoteDescription rawXml={rawXml} />
          {/* <h2>Vote Metrics</h2> */}
          <VoteResults rawXml={rawXml} onVoteDataCalculated={handleVoteDataCalculated} />
        </div>
      </div>
    </div>
  );
};

export default Analytics; 