const express = require('express')
const app = express()
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// Import Routes
const authRoute = require('./routes/auth');

dotenv.config();

// Coonect Database
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, ()=> {
  console.log('Connected to Database')
});

// Body parser Middleware
app.use(express.json());
// Route Middleware
app.use('/api/user', authRoute);

app.listen(5000, () => console.log('Server up and running'));