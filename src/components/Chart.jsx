import React from 'react';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export

const completionRate = (completion) => {
  const data = {
    labels: [],
    datasets: [
      {
        data: [completion, (100 - completion)],
        cutout: '80%',
        backgroundColor: [
          '#3b82f6',
          '#cbd5e1',
        ],
      },
    ],
  };

  return data;
};

export function Chart({ data }) {
  return <Doughnut data={completionRate(data)} />;
}

Chart.propTypes = {
  data: PropTypes.number.isRequired,
};
