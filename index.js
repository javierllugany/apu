//dependencias
const express = require('express'); //biblioteca que construye un servidor
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const http = require('http');
const fs = require('fs').promises;
const path = require('path');

//initializa dotenv:
dotenv.config();

//Import routes
const fpRoute = require('./routes/public');
const auth = require('./routes/auth');
const adminRoute = require('./routes/adminRoute');
const login = require('./routes/login');

//Route Middlewares
app.use(express.json({limit: '50mb'}));
app.use('/',fpRoute);
app.use('/admin',auth, adminRoute);
app.use('/loginAdmin',express.urlencoded({extended:false}),login);

//serving static-files for test-purpose / can be served directly by nginx
app.use('/public', express.static('./public'));

const PORT = process.env.PORT;
//const PORT = process.env.PORT || 4000; //esto funciona con dotenv y sin dotnev
app.listen(PORT,() => console.log('server up and running at port',PORT));
