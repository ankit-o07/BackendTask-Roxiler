// src/components/PieChart.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2';


function PieChart({ data }) {
    const labels = Object.keys(data);
    const values = Object.values(data);

    const chartData = {
        labels,
        datasets: [
            {
                label: '# of Products',
                data: values,
            },
        ],
    };

    return <Doughnut data={chartData} className="my-6 max-h-[400px] max-w-[400px]" />;
}

export default PieChart;
