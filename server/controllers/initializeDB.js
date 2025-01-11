import axios from "axios";

import Product from "../models/productModel.js";

const DATA_URL = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";

const initializeDB = async (req , res)=>{
    try{
        const { data } = await axios.get(DATA_URL);
        const insertData = Product.insertMany(data)
        if(insertData){
            res.status(201).json({success:true, message:`Database initialized successfully`});
        }else{
            res.status(401).json({success:false, message:`No data was inserted.`});
        }
        
    }catch(error){
        console.log(`Erorr: ${error}`);
        res.status(501).json({success:false, message:`erorr: ${error}`});
    }
}

export default initializeDB

