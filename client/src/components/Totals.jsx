// src/components/Totals.js
import React from 'react';
import { Statistic } from 'antd';

function Totals({ stats, loading }) {
    return (
        <div className="stats flex justify-between max-w-4xl p-3 border-t border-b border-gray-300">
            <Statistic
                valueStyle={{ fontSize: '32px' }}
                title="Total Sale"
                value={stats?.totalSales}
                loading={loading}
                prefix="₹"
            />
            <Statistic
                valueStyle={{ fontSize: '32px' }}
                title="Total Sold Items"
                value={stats?.soldCount}
                loading={loading}
            />
            <Statistic
                valueStyle={{ fontSize: '32px' }}
                title="Total Unsold Items"
                value={stats?.unsoldCount}
                loading={loading}
            />
        </div>
    );
}

export default Totals;
