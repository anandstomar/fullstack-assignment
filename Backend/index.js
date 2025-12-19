import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import projectRoutes from './routes/projectRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- API Routes will be added here ---
app.use('/api/projects', projectRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://flipr:2zBPl01a6v1AcKXa@cluster0.pwg6zql.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log('MongoDB connected');
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });