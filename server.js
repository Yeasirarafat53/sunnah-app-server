require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

const app = express();

// Database connect
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/hadiths', require('./src/routes/hadith.routes'));
app.use('/api/duas', require('./src/routes/dua.routes'));
app.use('/api/categories', require('./src/routes/category.routes'));

app.use(cors({
  origin: 'http://localhost:3000'
}));

// Home route
app.get('/', (req, res) => {
  res.json({ message: '🕌 Sunnah App API is running!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});