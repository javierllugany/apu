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
const adminRoute = require('./routes/admin');
const auth = require('./routes/auth');

//Route Middlewares
app.use(express.json({limit: '50mb'}));
// app.use('/admin',adminRoute);
app.use('/',fpRoute);
app.use('/admin',auth,adminRoute)

// Ruta para manejar subpáginas dinámicamente
app.get('/:subpagina', (req, res) => {
     const subpagina = req.params.subpagina;
     app.use(`/${subpagina}`, fpRoute);
});

//serving static-files for test-purpose / can be served directly by nginx
app.use('/public', express.static('./public'));

mongoose.set('useCreateIndex', true);
// Intenta la primera conexión a mongodb
mongoose.connect(process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
  if (err) {
    console.log('Error - No pudo conectarse a la base de datos 1:', err);
    // Si la conexión falla, se intenta la segunda conexión
    secondConnection();
  } else {
    console.log('Conectado a la base de datos 1');
  }
});
function connect2() {
  mongoose.connect(process.env.DB_CONNECT2,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
    if (err) {
      console.log('Error - No pudo conectarse a la base de datos 2:', err);
    } else {
      console.log('Conectado a la base de datos 2');
    }
  });
}

const PORT = process.env.PORT;
app.listen(PORT,() => console.log('server up and running at port',PORT));

/*
const fotosDrive = require('./scriptDrive.js');
fotosDrive.init();
*/

/* // ESTO ES CON la dependencia HTTP y sirve mas que nada para paginas estaticas
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
  //    Lee el contenido del archivo "index.html"
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error interno del servidor');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Página no encontrada');
  }
});
const PORT = 4000; // esto funciona si no está instalada la dependencia dotenv
const PORT = process.env.PORT || 4000; //esto funciona con dotenv y sin dotnev

server.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
}); */
