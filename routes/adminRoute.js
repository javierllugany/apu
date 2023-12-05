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
    //console.log("estamos en linea 13 routes/adminRoute.js");
    let data = await datacontroler.admin();
    response = templates.buildPage('admin',data);
    res.send(response);
  } catch (e) {
    console.warn(e);
    res.status(400).send('oops, something went wrong del adminroute');
  }
});

    // Escribe el array actualizado de entradas en el archivo JSON
  //  await fs.writeFile('./public/static/json/entradas.json', JSON.stringify(entradas, null, 2));



router.post('/entradas', fileUpload(), async (req,res)=>{
  console.log('linea 54 de adminRoute.js - titulo entrada:',req.body.titulo);
  // console.log(req.body, req.files);
  let content = {
    id: req.body.id,
    new: req.body.new,
    tipo: req.body.tipo,
    frontpage: (req.body.frontpage=='on'),
    titulo: req.body.titulo,
    fecha: req.body.fecha,
    dias: req.body.dias,
    horario: req.body.horario,
    lugar: req.body.lugar,
    descripcion: req.body.descripcion,
    tallerista: req.body.tallerista,
    organiza: req.body.organiza,
    fotos: req.body.fotos,
    audios: req.body.audios,
    videolink: req.body.videolink,


    // deleteimages: req.body.deleteimages,
    // deleteaudios: req.body.deleteaudios,
  }
  // if(req.body.eliminarfotos){
  //   if(typeof req.body.eliminarfotos == 'string'){
  //     console.log('delete one image');
  //     content.deleteimages = [req.body.eliminarfotos]
  //   }else{
  //     content.deleteimages = req.body.eliminarfotos
  //   }
  // }
  // if(req.body.eliminaraudios){
  //   if(typeof req.body.eliminaraudios == 'string'){
  //     console.log('delete one audio');
  //     content.deleteaudios = [req.body.eliminaraudios]
  //   }else{
  //     content.deleteaudios = req.body.eliminaraudios
  //   }
  // }
  // console.log('delete images:',req.body.eliminarfotos);
  // console.log('typeof eliminarfotos:',typeof req.body.eliminarfotos);
  // console.log('content is new?',content.isnew);
    //images
    // if(req.files){
    //   let cimages=[]
    //   let caudios=[]
    //   let cimagetitles=[]
    //   for(let x=1;x<=4;x++){
    //     if(req.files['foto'+x]){
    //       cimages.push({
    //         filename:req.files['foto'+x].name,
    //         data:req.files['foto'+x].data,
    //       })
    //       if(x==1)cimagetitles.push(req.body.fototext);
    //       else cimagetitles.push('')
    //     }
    //     if(req.files['audio'+x])caudios.push({
    //       filename:req.files['audio'+x].name,
    //       data:req.files['audio'+x].data,
    //       mimetype: req.files['audio'+x].mimetype,
    //     })
    //   }
    //   if(cimages.length>0)content.images=cimages;
    //   if(caudios.length>0)content.audios=caudios;
    //   content.imagetitles=cimagetitles;
    // }
  console.log('content created');
  let save = await datacontroler.datainput.entrada(content);
  console.log('saved content: linea 85 adminRoute');
  if(!true)return res.send('not okay :(')
  res.redirect('/admin');
  // res.send('okay? '+save)
})

module.exports = router;
