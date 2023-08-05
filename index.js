// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());

// Connect to MongoDB
const dbURI = 'mongodb://localhost:27017';
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const authMiddleware = require('./server/middleware/auth');
const userRoutes = require('./server/routes/userRoute');
const storeItemRoutes = require('./server/routes/storeRoute');

app.use('/api/store-items', authMiddleware);

app.use('/api/users', userRoutes);
app.use('/api/store-items', storeItemRoutes);

// Define the port for the server
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server up and running on port ${port}`));
