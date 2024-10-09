import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

interface BarChartProps {
  data: ChartData<'bar'>;
  options?: ChartOptions<'bar'>;
}

const BarChart: React.FC<BarChartProps> = ({ data, options }) => {
  const responsiveOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          maxRotation: 45, 
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

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <Bar data={data} options={{ ...options, ...responsiveOptions }} />
    </div>
  );
};

export default BarChart;
