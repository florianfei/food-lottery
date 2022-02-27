import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import { foodOptionsRouter } from './routes/food_options.js';

dotenv.config();
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to the mongodb instance'));

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    console.log('Received a request!');
    let data = {
        choice: options[Math.floor(Math.random()*options.length)]
    };
    res.send(data);
});

app.use('/food-options', foodOptionsRouter);

app.listen(process.env.PORT, () => console.log('Server is running at port', process.env.PORT));