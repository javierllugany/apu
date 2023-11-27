//dependencias
const express = require('express'); //biblioteca que construye un servidor
const app = express();
// const mongoose = require('mongoose'); (para conectar a base de datos MongoDB)
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const http = require('http');
const fs = require('fs');
const path = require('path');

//initializa dotenv:
dotenv.config();

//Import routes
const fpRoute = require('./routes/public');
const auth = require('./routes/auth');
const adminRoute = require('./routes/adminRoute');

//Route Middlewares
app.use(express.json({limit: '50mb'}));
app.use('/',fpRoute);
app.use('/admin', auth, adminRoute);

//serving static-files for test-purpose / can be served directly by nginx
app.use('/public', express.static('./public'));

//mongoose.set('useCreateIndex', true);
// Intenta la primera conexión a mongodb
// mongoose.connect(process.env.DB_CONNECT,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   (err) => {
//   if (err) {
//     console.log('Error - No pudo conectarse a la base de datos 1:', err);
//     // Si la conexión falla, se intenta la segunda conexión
//     secondConnection();
//   } else {
//     console.log('Conectado a la base de datos 1');
//   }
// });
// function connect2() {
//   mongoose.connect(process.env.DB_CONNECT2,
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     (err) => {
//     if (err) {
//       console.log('Error - No pudo conectarse a la base de datos 2:', err);
//     } else {
//       console.log('Conectado a la base de datos 2');
//     }
//   });
// };

const PORT = process.env.PORT;
//const PORT = process.env.PORT || 4000; //esto funciona con dotenv y sin dotnev
app.listen(PORT,() => console.log('server up and running at port',PORT));
