const datacontroler = require('../datacontroler.js');
const templates = require('../templates.js');
const router = require('express').Router();

router.get('/adminRoute', async (req,res)=>{
  try {
    let data = await datacontroler.admin();
    response = templates.buildPage('admin',data);
    res.send(response);
  } catch (e) {
    console.warn(e);
    res.status(400).send('oops, something went wrong del public');
  }
});
