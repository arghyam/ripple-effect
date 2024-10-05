import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

const BarChart = ({ data, options }) => {
  const responsiveOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          maxRotation: 45, // Adjust rotation for x-axis labels for better readability
          minRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return <div style={{ position: 'relative', height: '100%', width: '100%' }}>
    <Bar data={data} options={{ ...options, ...responsiveOptions }} />
  </div>;
};

export default BarChart;

