import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import colors from 'tailwindcss/colors';


ChartJS.register(ArcElement, Tooltip, Legend);

export 

const completionRate = (completion) => {

  const data = {
    labels: [],
    datasets: [
      {
        data: [completion,(100-completion)],
        cutout: '80%',
        backgroundColor: [
          colors.blue[500],
          colors.slate[300],
        ],
      },
    ],
  };

  return data
}

export function Chart({data}) {
  return <Doughnut data={completionRate(data)} />;
}
