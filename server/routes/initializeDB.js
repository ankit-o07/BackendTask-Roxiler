import express from  'express'

import initializeDB from '../controllers/initializeDB.js';


const router = express.Router();


router.get('/initialize-DB',initializeDB)


export default router