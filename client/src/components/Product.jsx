import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Input, message, Image, Typography, Divider, Tag, Empty } from 'antd';
import moment from 'moment';

const { Search } = Input;
const { Title, Text } = Typography;

const categoryColors = {
    Electronics: "blue",
    Clothing: "green",
    Furniture: "orange",
    Books: "purple",
    "Home Decor": "red",
};

const columns = [
    {
        title: "#",
        dataIndex: "id",
        width: "50px",
        align: "center",
    },
    {
        title: "Title",
        dataIndex: "title",
        width: "240px",
        render: (text) => <Text strong>{text}</Text>,
    },
    {
        title: "Price (₹)",
        dataIndex: "price",
        render: (price) => <Text strong>₹{parseFloat(price).toFixed(2)}</Text>,
        width: "120px",
        align: "right",
    },
    {
        title: "Description",
        dataIndex: "description",
        ellipsis: true,
    },
    {
        title: "Category",
        dataIndex: "category",
        width: "160px",
        align: "center",
        render: (category) => (
            <Tag color={categoryColors[category] || "default"}>{category}</Tag>
        ),
    },
    {
        title: "Sold",
        dataIndex: "sold",
        render: (sold) => <Text>{sold ? "Yes" : "No"}</Text>,
        width: "70px",
        align: "center",
    },
    {
        title: "Date",
        dataIndex: "dateOfSale",
        render: (date) => moment(date).format("DD MMM YYYY"),
        width: "140px",
        align: "center",
    },
    {
        title: "Image",
        dataIndex: "image",
        render: (url) => (
            <Image
                src={url}
                alt="Product"
                width={60}
                height={60}
                style={{ objectFit: "cover", borderRadius: "8px" }}
            />
        ),
        width: "120px",
    },
];

function Product({ month, monthText }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
        search: '',
    });

    const getData = async () => {
        try {
            setLoading(true);
            const { data: response } = await axios.get(`http://localhost:5000/api/get-product`, {
                params: {
                    month,
                    page: tableParams.pagination.current,
                    limit: tableParams.pagination.pageSize,
                    search: tableParams.search,
                },
            });

            setData(response.Product);
            setLoading(false);
            setTableParams((prevParams) => ({
                ...prevParams,
                pagination: {
                    ...prevParams.pagination,
                    total: response.totalProduct,
                },
            }));
            message.success('Data loaded successfully');
        } catch (error) {
            console.error(error);
            setLoading(false);
            message.error('Error loading data');
        }
    };

    const handleTableChange = (pagination) => {
        setTableParams((prevParams) => ({
            ...prevParams,
            pagination,
        }));
    };

    const handleSearch = (value) => {
        setTableParams((prevParams) => ({
            ...prevParams,
            search: value,
            pagination: { ...prevParams.pagination, current: 1 },
        }));
    };

    useEffect(() => {
        getData();
    }, [JSON.stringify(tableParams), month]);

    return (
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
            <Search
                placeholder="Search products..."
                allowClear
                onSearch={handleSearch}
                style={{ width: 350, marginBottom: 16 }}
            />
            <Title level={4} style={{ marginBottom: 8 }}>
                {data.length} Product{data.length !== 1 ? "s" : ""} Found - <Text type="secondary">{monthText}</Text>
            </Title>
            <Divider />
            <div
                className="product-table-container"
                style={{
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    padding: '16px',
                    background: '#fff',
                }}
            >
                <Table
                    columns={columns}
                    rowKey={(record) => record.id}
                    dataSource={data.length ? data : null}
                    pagination={tableParams.pagination}
                    loading={loading}
                    onChange={handleTableChange}
                    size="middle"
                    bordered
                    sticky
                    scroll={{ y: 540 }}
                    title={() => <strong>Transactions for {monthText}</strong>}
                    locale={{ emptyText: <Empty description="No Products Found" /> }}
                    rowClassName="table-row-hover"
                />
            </div>
        </div>
    );
}

export default Product;
