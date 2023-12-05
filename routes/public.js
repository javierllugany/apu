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

router.get('/cineTerror', async (req,res)=>{
  try {
    let data = await datacontroler.cineTerror();
    response = templates.buildPage('cineTerror',data);
    res.send(response);
  } catch (e) {
    console.warn(e);
    res.status(400).send('oops, something went wrong del public');
  }
});

router.get('/talleres', async (req,res)=>{
      try{
        let result = ''
        let data = await datacontroler.talleres()
        if(!data){
          res.status(404).send('oops, not found')
          return;
        }

        result = templates.buildPage('talleres', {data:data})
        res.send(result)
      }catch(e){
        console.log(e)
        res.status(400).send('an error occured')
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

// router.get('/:subpagina', async (req, res) => {
//   try {
//      const subpagina = req.params.subpagina;
//      let data = await datacontroler.subpagina(subpagina);
//      response = templates.buildPage(subpagina,data);
//      res.send(response);
//     } catch (e) {
//       console.warn(e);
//       res.status(400).send('oops, something went wrong del public');
//     }
// });

module.exports = router;
