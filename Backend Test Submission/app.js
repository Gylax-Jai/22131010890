const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const shorturlRoutes = require('./routes/shorturlRoutes');
const customLogger = require('./middlewares/logger');

// dotenv.config();
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(customLogger); // your own logging middleware
app.use('/', shorturlRoutes);
app.get('/',(req,res)=>{
    res.send('url shortner by jai backend code');
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log('Server running at...'+process.env.PORT);
    });
  })
  .catch(err => console.error('DB connection error:', err)); 
