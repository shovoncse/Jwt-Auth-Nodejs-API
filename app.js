const express = require('express')
const app = express()
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Coonect Database
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, ()=> {
  console.log('Connected to Database')
});

// Import Routes
const authRoute = require('./routes/auth');

// Route Middleware
app.use('/api/user', authRoute);

app.listen(5000, () => console.log('Server up and running'));