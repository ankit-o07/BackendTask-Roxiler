import mongoose from "mongoose";


const ConnectMongoDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB connected successfully`);
    }catch(error){
        console.error(`Unable to connect with the database \nError: ${error.message}`);
        process.exit(1);
    }
}

export default ConnectMongoDB;