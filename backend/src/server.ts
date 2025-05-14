import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './routes';
import { logger } from './middleware/logger';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

app.use('/', router);

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});