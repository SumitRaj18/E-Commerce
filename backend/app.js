import express from 'express'
import Sports from './data.js';
import cors from 'cors'
import mongoose from 'mongoose';
import {handleSignup,handleLogin, handleEdit} from './control/handleUser.js';
import { placeOrder, getUserOrders } from './control/handleOrders.js';
import { verifyToken } from './middleware/auth.js';
import 'dotenv/config'
import router from './control/handleCart.js';
const MongoDb= process.env.MONGO_DB;

mongoose.connect(MongoDb).
then(()=>console.log('Mongo Connected')).
catch(()=>console.log("Error"))
const app = express();


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:false}))
 app.get('/api/sports',(req,res)=>{
    res.send(Sports);
 })
 app.post('/api/signup',handleSignup);
 app.post('/api/login',handleLogin);
 app.put('/api/update',handleEdit);
app.post('/api/place',verifyToken, placeOrder);
app.get('/api/user/:userId',verifyToken, getUserOrders);
app.use('/api/',router)



 app.listen(8001,()=>console.log('Server is running'))