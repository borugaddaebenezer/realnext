import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import cors from'cors';
import path from 'path';
dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Connected to MongoDB!');
}).catch((err)=>{
    console.log(err);
});

//  const __dirname = path.resolve();

const app=express();

app.use(cors({
  origin: 'http://localhost:5173', // your frontend port
  credentials: true,
}));
app.use(cookieParser())

app.use(express.json());

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/listing', listingRouter);

// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// })


app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message||'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
});