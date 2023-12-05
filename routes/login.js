const datacontroler = require('../datacontroler.js');
const templates = require('../templates.js');
const router = require('express').Router();
//const bodyParser = require('body-parser');

router.get('/', async (req,res)=>{
  try {
    //let data = await datacontroler.login();
    response = templates.buildPage('login');
    res.send(response);
  } catch (e) {
    console.warn(e);
    res.status(400).send('oops, something went wrong del public');
  }
});

router.post('/', async (req,res)=>{
  try{
    const password = req.body.password;
    //console.log('Estoy en routes/login.js - Contraseña ingresada:', password);
    let token = await datacontroler.login(req.body.password);
    //console.log('volvimos a routes/login.js - token:',token,'req.password',req.body.password);
    if(!token){
      res.status(400).send('error on login');
      return;
    }
    res.cookie('jwt', token, {maxAge: 5*60*60*1000}); //jesonwebtoken es mejor que sesion id , y adentro del json esta el nombre y el token
    res.redirect('/admin')
  }catch(e){
    console.warn(e);
    res.status(400).send('error');
  }
});
router.get('/logout', async (req,res)=>{
  //console.log("llegamos a /logout en routes/login.js");
  try{
    res.clearCookie('jwt');
    res.redirect('/');
  }catch(e){
    console.warn(e);
    res.status(400).send('error');
  }
});

module.exports = router;
