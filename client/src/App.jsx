import { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Layout, Menu, Select } from 'antd';

import Product from './components/Product';
import Statistics from './components/statistics';

const options = [
  "All Months",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const { Header, Content, Footer } = Layout;

const navItems = [
  {
    key: 1,
    label: (<NavLink to="/" className="text-white">Transactions</NavLink>)
  },
  {
    key: 2,
    label: (<NavLink to="/Statistics" className="text-white">Statistics</NavLink>)
  }
];

function App() {
  let [month, setMonth] = useState(3);

  const handleMonthChange = (value) => {
    setMonth(parseInt(value));
  };

  return (
    <BrowserRouter>
      <Layout className="flex flex-col min-h-screen">
        {/* Header */}
        <Header className="flex justify-between items-center p-4 ">
          <h1 className="text-white text-3xl font-extrabold">Dashboard</h1>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={navItems}
            className="flex-1 mx-16 text-xl justify-center"
            
          />
          <Select
            size="large"
            defaultValue={options[month]}
            onChange={handleMonthChange}
            className="w-48  text-white "
            options={options.map((text, i) => ({
              value: i,
              label: text
            }))}
          />
        </Header>

        {/* Content */}
        <Content className="px-12 py-6 bg-white min-h-[600px]">
          <Routes>
            <Route path="/" element={<Product month={month} monthText={options[month]} />} />
            <Route path="/Statistics" element={<Statistics month={month} monthText={options[month]} />} />
          </Routes>
        </Content>

        {/* Footer */}
        <Footer className="text-center py-4 bg-[#2C3E50] text-white">
          Copyright (c) 2025 Ankit. All rights reserved.
        </Footer>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
