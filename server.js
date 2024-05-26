import express from 'express';
import dotenv from 'dotenv';
import indexRouter from './routes/index.js';
import configRoutes from './routes/configRoutes.js'
import connectDB from './utils/connectDB.js';
import taskRunRoutes from './routes/taskRunRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();
connectDB()
const app = express();
app.use(express.json());

app.use('/', indexRouter);
app.use('/path', configRoutes);
app.use('/api', taskRunRoutes);
app.use(errorHandler);


const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
