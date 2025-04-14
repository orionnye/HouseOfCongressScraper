import React from 'react';

interface LegislatorListProps {
  title: string;
  legislators: { name: string; color: string }[];
  isExpanded: boolean;
  toggleExpand: () => void;
}

const LegislatorList: React.FC<LegislatorListProps> = ({ title, legislators, isExpanded, toggleExpand }) => {
  return (
    <div>
      <h4 onClick={toggleExpand} style={{ cursor: 'pointer' }}>{title}</h4>
      {isExpanded && (
        <ul style={{ maxHeight: '200px', overflowY: 'auto', padding: '5px', boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.2)', transition: 'max-height 0.6s ease-in-out' }}>
          {legislators.map(({ name, color }, index) => (
            <li key={index} style={{ color }}>{name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LegislatorList; 