import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'

import ConnectMongoDB from './config/db.js'
import initializeRouter from './routes/initializeDB.js';
import productRouter from './routes/product.js';


dotenv.config();
const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json());
app.use(cors())


app.get("/ping", (req,res)=>{
    res.send("<h1>Pong");
})


// app.use('/init',initializeRouter)
app.use("/api",productRouter);


// Start the server
const startServer = async () => {
    try {
        // Connect to MongoDB
        await ConnectMongoDB();

        // Start listening for requests
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start the server:", error.message);
        process.exit(1);
    }
};

startServer();

