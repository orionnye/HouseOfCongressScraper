import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import pattern from 'patternomaly';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartNode {
  weight: number;
  color: string;
  pattern?: string;
  children?: PieChartNode[];
}

interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    borderWidth: number;
  }[];
}

const CustomPieChartDisplay: React.FC<{ data: ChartData, style?: React.CSSProperties }> = ({ data, style }) => {
  const patternedData = {
    ...data,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      backgroundColor: [
        pattern.draw('diagonal', '#4a90e2'), // Democrat Yea
        pattern.draw('diagonal', '#d9534f'), // Republican Yea
        pattern.draw('cross', '#4a90e2'), // Democrat Nay
        pattern.draw('cross', '#d9534f'), // Republican Nay
        pattern.draw('diagonal', '#5cb85c'), // Independent Yea
        pattern.draw('cross', '#5cb85c'), // Independent Nay
        '#6c757d' // Not Voting
      ],
    })),
  };

  return (
    <div style={style}>
      <Pie data={patternedData} />
    </div>
  );
};

export default CustomPieChartDisplay;