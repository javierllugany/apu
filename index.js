//dependencias
const entrada = require('entrada');

//Import routes
const routesentrada = require('./routes/routesentrada');

import { nuevaEntrada } from "./js/nuevaEntrada.js";

const nuevaEntrada = new nuevaEntrada();
document.body.appendChild(nuevaEntrada);

//initializa dotenv:

dotenv.config();

mongoose.set('useCreateIndex', true);
//Connect to DB
mongoose.connect(process.env.DB_CONNECT,
  {useNewUrlParser:true,
   useUnifiedTopology: true},
(err)=> {
  if(err)console.log('error by connecting to db',err);
  else console.log('connected to db');
});

//Route Middlewares
app.use(express.json({limit: '50mb'}));
// app.use('/admin',adminRoute);
app.use('/',fpRoute);
// app.use('/noticia',notesRoute);
app.use('/search',express.urlencoded({extended:false}),searchRoute);
app.use('/iniciar',express.urlencoded({extended:false}),loginRoute);
app.use('/user',auth, express.urlencoded({extended:true}),userRoute);
//app.use('/user', express.urlencoded({extended:true}),userRoute);
app.use('/api', auth, express.json({limit: '50mb'}),api);
app.use('/admin',auth,adminRoute)

//serving static-files for test-purpose / can be served directly by nginx
app.use('/public', express.static('./public'));

//start listening server
app.listen(3033,() => console.log('server up and running at port',3033));
