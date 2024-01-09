const datacontroler = require('../datacontroler.js');
const templates = require('../templates.js');
const router = require('express').Router();
const path = require('path');
const express = require('express');
const fs = require('fs').promises;
const app = express();
const fileUpload = require('express-fileupload');

app.use(express.json());

router.get('/', async (req,res)=>{
  try {
    let data = await datacontroler.admin();
    response = templates.buildPage('admin',data);
    res.send(response);
  } catch (e) {
    console.warn(e);
    res.status(400).send('oops, something went wrong del adminroute');
  }
});

router.get('/listaActividades', async (req,res)=>{
  try {
    let data = await datacontroler.listaActividades();
    response = templates.buildPage('listaActividades',data);
    res.send(response);
  } catch (e) {
    console.warn(e);
    res.status(400).send('linea 32 adminRoute.js - oops, something went wrong del adminroute');
  }
});

router.get('/:id', async (req,res)=>{
  try {
    console.log("estamos en linea 37 adminRoute.js");
    let id=req.params.id;
    let data = await datacontroler.admin(req.params.id);
    if(!data)return res.status(400).send('did not work linea 38 adminroute')
    response = templates.buildPage('admin',data);
    res.send(response);
  } catch (e) {
    console.warn(e);
    res.status(400).send('linea 43 adminRoute.js - oops, something went wrong del adminroute');
  }
});

router.get('/borrar/:id', async (req,res)=>{
  try {
    console.log("estamos en linea 50 adminRoute.js");
    let id=req.params.id;
    let data = await datacontroler.borrar(req.params.id);
    if (data===true) {
      res.redirect('/admin');
    } else {
      return res.status(400).send('did not work linea 57 adminroute')
    }
  } catch (e) {
      console.warn(e);
      res.status(400).send('linea 58 adminRoute - oops, something went wrong del adminroute');
  }
});

  // Escribe el array actualizado de entradas en el archivo JSON
  //  await fs.writeFile('./public/static/json/entradas.json', JSON.stringify(entradas, null, 2));

router.post('/entradas', fileUpload(), async (req,res)=>{
    let content = {
      id: req.body.id,
      tipo: req.body.tipo,
      frontpage: req.body.frontpage,
      titulo: req.body.titulo,
      fechaInicio: req.body.fechaInicio,
      programa: req.body.programa,
      lugar: req.body.lugar,
      descripcion: req.body.descripcion,
      tallerista: req.body.tallerista,
      organiza: req.body.organiza,
      videolink: req.body.videolink,
      eliminarfotos: [],
      eliminaraudios: [],
    }

    if(req.body){
      let borrarfotos=[]
      let borraraudios=[]
      for(let x=1;x<=4;x++){
        if(req.body['eliminarfotos'+x]){
          borrarfotos.push({
            url:req.body['eliminarfotos'+x],
          })
        }
        if(req.body['eliminaraudios'+x]){
          borraraudios.push({
            url:req.body['eliminaraudios'+x],
          })
        }
      }
      if(borrarfotos.length>0)content.eliminarfotos=borrarfotos;
      if(borraraudios.length>0)content.eliminaraudios=borraraudios;
    }
  console.log('linea 86 adminRoute content.eliminarfotos es:', content.eliminarfotos);

    //images
    if(req.files){
      let cimages=[]
      let caudios=[]
      for(let x=1;x<=4;x++){
        if(req.files['foto'+x]){
          cimages.push({
            filename:req.files['foto'+x].name,
            data:req.files['foto'+x].data,
          })
        }
        if(req.files['audio'+x])caudios.push({
          filename:req.files['audio'+x].name,
          data:req.files['audio'+x].data,
          mimetype: req.files['audio'+x].mimetype,
        })
      }
      if(cimages.length>0)content.fotos=cimages;
      if(caudios.length>0)content.audios=caudios;
    }
  console.log('linea 108 adminroute: content created');
  let save = await datacontroler.datainput.entrada(content);
  console.log('saved content: linea 110 adminRoute');
  if(!true)return res.send('not okay :(')
  res.redirect('/admin');
  // res.send('okay? '+save)
})

module.exports = router;
