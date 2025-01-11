import Product from '../models/productModel.js';
import axios from 'axios';


export const getProductStatistics = async (req, res) => {
    try {
        const month = !isNaN(parseInt(req.query.month)) ? parseInt(req.query.month) : 3;
        const monthQuery = month === 0 ? {} : {
            $expr: {
                $eq: [{ $month: "$dateOfSale" }, month]
            }
        };

        // Project query to get only relevant fields: price, sold, and dateOfSale
        const projectQuery = {
            _id: 0,
            price: 1,
            sold: 1,
            dateOfSale: 1
        };

        const data = await Product.find(monthQuery, projectQuery);

        
        const response = data.reduce((acc, curr) => {
            const currPrice = parseFloat(curr.price);

            // Calculate total sales and sold/unsold count
            if (curr.sold) {
                acc.totalSales += currPrice;
                acc.soldCount++;
            } else {
                acc.unsoldCount++;
            }

            return acc;
        }, { totalSales: 0, soldCount: 0, unsoldCount: 0 });

        
        response.totalSales = response.totalSales.toFixed(2);
        
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};



// Get bar chart data (price range)
export const getProductBarChart = async (req, res) => {
    try {
        const month = !isNaN(parseInt(req.query.month)) ? parseInt(req.query.month) : 3;
        const monthQuery = month === 0 ? {} : {
            $expr: {
                $eq: [{ $month: "$dateOfSale" }, month]
            }
        };

        const projectQuery = {
            _id: 0,
            price: 1
        };

        const data = await Product.find(monthQuery, projectQuery);

        let accumulator = {};

        for (let i = 1; i <= 10; i++) {
            let range = i * 100;

            if (i === 10)
                range = '901-above';
            else if (i === 1)
                range = '0-100';
            else
                range = `${range - 100 + 1}-${range}`;

            accumulator[range] = 0;
        }

        const response = data.reduce((acc, curr) => {
            const currPrice = parseFloat(curr.price);

            let priceRange = Math.ceil(currPrice / 100) * 100;

            if (priceRange === 100)
                priceRange = '0-100';
            else if (priceRange > 900)
                priceRange = '901-above';
            else
                priceRange = `${priceRange - 100 + 1}-${priceRange}`;

            acc[priceRange]++;

            return acc;
        }, accumulator);

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Get pie chart data (categories)
export const getProductPieChart = async (req, res) => {
    try {
        const month = !isNaN(parseInt(req.query.month)) ? parseInt(req.query.month) : 3;
        const monthQuery = month === 0 ? {} : {
            $expr: {
                $eq: [{ $month: "$dateOfSale" }, month]
            }
        };

        const projectQuery = {
            _id: 0,
            category: 1
        };

        const data = await Product.find(monthQuery, projectQuery);

        const response = data.reduce((acc, curr) => {
            acc[curr.category] ? acc[curr.category]++ : acc[curr.category] = 1;
            return acc;
        }, {});

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Get combined data from all APIs
export const getCombinedProductData = async (req, res) => {
    try {
        const baseURL = `${req.protocol}://${req.get('host')}`;
        const [stats, barChart, pieChart] = await Promise.all([
            axios.get(`http://localhost:5000/api/product-statistics?month=${req.query.month}`),
            axios.get(`http://localhost:5000/api/product-bar-chart?month=${req.query.month}`),
            axios.get(`http://localhost:5000/api/product-pie-chart?month=${req.query.month}`)
        ]);

        const response = {
            statsData: stats.data,
            barChartData: barChart.data,
            pieChartData: pieChart.data
        };


        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
};
