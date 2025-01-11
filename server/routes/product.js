import express from  'express'

import getProduct from '../controllers/product.js';
import { getProductPieChart, getCombinedProductData , getProductBarChart , getProductStatistics } from '../controllers/filter.js';


const productRouter = express.Router();

productRouter.get("/get-product", getProduct);

productRouter.get('/product-statistics', getProductStatistics);
productRouter.get('/product-bar-chart', getProductBarChart);
productRouter.get('/product-pie-chart', getProductPieChart);
productRouter.get('/combined-product-data', getCombinedProductData);


export default productRouter ;