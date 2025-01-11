import Product from "../models/productModel.js";

const getProduct = async (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 10;
        const month = parseInt(req.query.month) || 0; 
        const search = req.query.search || '';
        const skip = page * limit;

        let searchConfig;

        
        if (month === 0) {
            
            searchConfig = {
                $or: [
                    { title: { $regex: search, $options: 'i' } }, 
                    { description: { $regex: search, $options: 'i' } }, 
                    { category: { $regex: search, $options: 'i' } } 
                ]
            };
        } else {
            
            searchConfig = {
                $and: [
                    {
                        $expr: {
                            $eq: [{ $month: "$dateOfSale" }, month] 
                        }
                    },
                    {
                        $or: [
                            { title: { $regex: search, $options: 'i' } }, 
                            { description: { $regex: search, $options: 'i' } }, 
                            { category: { $regex: search, $options: 'i' } } 
                        ]
                    }
                ]
            };
        }

       
        const data = await Product.find(searchConfig).skip(skip).limit(limit);
        const totalProduct = await Product.countDocuments(searchConfig);

        const response = {
            success: true,
            totalProduct,
            page: page + 1,
            limit,
            month,
            Product: data
        };
        res.status(201).json(response);

    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(501).json({ success: false, message: `Error: ${error.message}` });
    }
};





export default getProduct;
