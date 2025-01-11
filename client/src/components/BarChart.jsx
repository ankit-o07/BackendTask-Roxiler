
import React from 'react';
import { Bar } from 'react-chartjs-2';

function BarChart({ data }) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            x: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Price Range',
                },
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Product Count',
                },
                ticks: {
                    stepSize: 4,
                },
            },
        },
        aspectRatio: 1.6,
        plugins: {
            title: {
                display: true,
                text: 'No of products per price range',
            },
        },
    };

    const labels = Object.keys(data);
    const values = Object.values(data);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'No of products per price range',
                data: values,
                backgroundColor: ['rgba(0, 105, 100, 0.7)'],
            },
        ],
    };

    return (
        <Bar
            data={chartData}
            options={options}
            className="my-6 max-w-4xl max-h-[500px]"
        />
    );
}

export default BarChart;
