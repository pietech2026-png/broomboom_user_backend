require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

let isConnected = false;

const startServer = async () => {
  if (isConnected) return;

  try {
    await connectDB();
    isConnected = true;
  } catch (error) {
    console.error("Database connection failed during lazy initialization:", error.message);
  }
};

app.use(async (req, res, next) => {
  await startServer();

  next();
});

// Middleware
app.use(cors());
app.use(express.json());

// Test Routes
app.get("/", (req, res) => {
  res.send("Backend Working");
});

app.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "API Running"
  });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/car-categories', require('./routes/carCategoryRoutes'));
app.use('/api/pricing-rules', require('./routes/pricingRuleRoutes'));
app.use('/api/global-settings', require('./routes/globalSettingRoutes'));
app.use('/api/search-leads', require('./routes/searchLeadRoutes'));
app.use('/api/cities', require('./routes/cityRoutes'));

const PORT = process.env.PORT || 5004;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
  });
}

module.exports = app;
