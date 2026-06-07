import express from 'express';
import 'dotenv/config';
import connectDB from './db.js';
import router from './routes/route.js';
import cors from 'cors';
connectDB();
const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors(`${process.env.FRONTEND_URL}`));
app.use(express.json());


app.use('/api', router);
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at ${PORT}`);
});

export default app;
