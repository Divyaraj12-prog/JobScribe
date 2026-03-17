require('dotenv').config();
const app = require('./src/app');
const express = require('express');
const connectDB = require('./src/DB/db');
connectDB();

app.use('/uploads', express.static('uploads'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});