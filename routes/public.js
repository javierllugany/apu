// displays public pages:
const datacontroler = require('../datacontroler.js');
const templates = require('../templates.js');

const router = require('express').Router();
const path = require('path');

//frontpage:
router.get('/', async (req,res)=>{
  try {
    let data = await datacontroler.frontpage();
    response = templates.buildPage('frontpage',data);
    res.send(response);
  } catch (e) {
    console.warn(e);
    res.status(400).send('oops, something went wrong del public');
  }
});

router.get('/ubicacion', async (req,res)=>{
 try {
  let data = await datacontroler.ubicacion();
  response = templates.buildPage('ubicacion',data);
  res.send(response);
 } catch (e) {
   console.warn(e);
   res.status(400).send('oops, something went wrong del public');
 }
});

router.get('/:subpagina', async (req, res) => {
  try {
     const subpagina = req.params.subpagina;
     let data = await datacontroler.subpagina(subpagina);
     response = templates.buildPage(subpagina,data);
     res.send(response);
    } catch (e) {
      console.warn(e);
      res.status(400).send('oops, something went wrong del public');
    }
});

module.exports = router;
