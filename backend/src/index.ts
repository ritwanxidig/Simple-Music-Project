import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';

dotenv.config();

const app = express();
app.use(express.json());


app.listen(process.env.PORT || 3030, () => {
    console.log(`Server started on port ${process.env.PORT || 3030}`)
});


// DB connection
mongoose.Promise = Promise;
mongoose.connect(process.env.DB_URL);
mongoose.connection.on("error", (err: Error) => {
    console.error(`MongoDB connection error: ${err}`);
});


// endpoints
app.get('/api', (req, res) => {
    res.send('The Server is Working!');
});
app.use('/api', routes());

// middleware for error formatting
app.use(async (
    err: any,
    req: any,
    res: any,
    next: any
) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";

    return res.status(status).json({
        success: false,
        status: status,
        message
    })
});