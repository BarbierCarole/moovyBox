const express = require('express');
const session = require('express-session'); 
require('dotenv').config(); 
const PORT = process.env.PORT || 5050; 
const app = express(); 
const cors = require('cors');
const multer = require('multer');


const corsOpts = {
  //origin: ['http://localhost', 'http://18.206.96.118'],
  origin:true,
  prefligthContinue: false,
  credentials: true, 
  optionsSuccessStatus: 204,
  allowedHeaders : ['Content-Type', 'Authorization', 'Set-Cookie', 'Cookie']
}; 

//app.use(cors(['localhost', '18.206.96.118'])); 
app.use(cors(corsOpts)); 

// Bodyparser for form-data encoded body form
app.use(multer().none()); 

// Bodyparser for  encoded body form
app.use(express.urlencoded({extended: true}));

// Bodyparser for json type data
app.use(express.json()); 

app.use(session({
  secret: 'booxxy', // 'keyboard cat' as a default secret would become easy to hack. 
  resave: false,
  saveUninitialized: false,
  cookie: {
    //path:'*',
    maxAge: 6*30*24*3600*1000,
    httpOnly: false,
    secure: false, // false : http and https / true : only https 
  }
})); 

app.use(require('./app/router')); 

app.listen(PORT, _ => console.log("Server running on ", PORT)); 