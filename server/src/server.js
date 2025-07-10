require('dotenv').config();

const http = require('http');
const fs = require('fs');
const formidable = require('formidable');
const mysql = require('mysql');
  const path = require('path');

  const express=require('express');
  const cors = require('cors');
  const session = require('express-session');


  const app=express();
  

  const routes=require('./routes/routes');
  app.use(cors({
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN :"TTGDSDFD",
  credentials: true, // if you’re using cookies or auth headers
  allowedHeaders: ["Authorization", "Content-Type"]
}));
app.use(session({
  secret: process.env.SECRET?process.env.SECRET:"mySuperSecretKey", // change this to a strong secret
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // secure: true only if using HTTPS
}));
  app.use(express.json());// ✅ Middleware 1: Parse JSON body

  app.use(express.urlencoded({multiples:true}));// ✅ Middleware 2: Handle form data

app.use('/uploads', express.static(path.join('uploads')));

  app.use('/', routes);
  app.use((req,res)=>{res.status(400).send("route not found")});
  const PORT = process.env.PORT?process.env.PORT: 3026;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
