// src/components/Statistics.js
import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS } from "chart.js/auto";
import axios from 'axios';
import { message } from 'antd';
import Totals from './Totals';
import BarChart1 from './BarChart';
import PieChart from './PieChart';

function Statistics({ month, monthText }) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`http://localhost:5000/api/combined-product-data?month=${month}`);
            setLoading(false);
            setData(res.data);
            message.success('Data loaded successfully');
        } catch (error) {
            setLoading(false);
            message.error('Error loading data');
        }
    };

    useEffect(() => {
        getData();
        return () => {
            setData(null);
        };
    }, [month]);

    return (
        <div className="bg-gray-50 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
                Statistics for {monthText}
            </h2>
            <div className="flex flex-wrap justify-center gap-16">

                <div className="min-w-[720px] max-w-[100%] bg-white rounded-lg shadow-md p-6">
                    <Totals stats={data?.statsData} loading={loading} />
                    {data && <BarChart1 data={data?.barChartData} />}
                </div>

                <div className="flex justify-center">
                    {data && <PieChart data={data?.pieChartData} />}
                </div>
            </div>
        </div>
    );
}

export default Statistics;
