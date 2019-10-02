const express = require('express')
const app = express()

// Import Routes
const authRoute = require('./routes/auth');

// Route Middleware
app.use('/api/user', authRoute);


app.listen(5000, () => console.log('Server up and running'))