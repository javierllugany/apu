const fs = require('fs').promises;
//const bodyParser = require('body-parser');
const express = require('express');
//const Entrada = require('./public/static/json/entradas.json');
//const sharp = require('sharp');
const fetch = require('node-fetch');

const datacontroler = {
  frontpage: async function(){
    //exporta un objeto que contiene todos datos para frontpage
    // if(this.cache.frontpage)return this.cache.frontpage;
    let agenda1="hola agenda1 del datacontroler"
    let agenda2="Chau agenda2 del datacontroler"

    let newfrontpage = {
      articulo1:agenda1,
      articulo2:agenda2,
    }
    return newfrontpage;
  },

  ubicacion: async function(){
    let ne2Terror="hola ${subpagina} automatica del datacontroler"
    let newTerror = {
      articulo1:ne2Terror,
      articulo20:"hai mas Terror",
    }
    return newTerror;
  },

  subpagina: async function(subpagina){
    let ne2Terror="hola ${subpagina} automatica del datacontroler"
    let newTerror = {
      articulo1:ne2Terror,
      articulo20:"hai mas Terror",
    }
    return newTerror;
  },

  talleres: async function(pagenr){
    try {
      let query = {tipo:'taller'};
      let limit = 20;
      let qopt = {sort : {pubdate:-1}, limit: limit};
      if(pagenr)qopt.skip=pagenr*limit;
      let talleres = await Taller.find(query,null,qopt);
      return talleres;
    } catch (e) {
        console.log(e);
        return false;
      }
  },

  login: function(password){
        //console.log("estoy en datacontroler.js linea 50");
        //console.log('comparing pw', password, "con", process.env.TOKEN_Admin2);
    if (password === process.env.TOKEN_Admin2) {
      //let val = await bcrypt.compare(password, admin.password);
      //let val = await bcrypt.compare(password, process.env.TOKEN_Admin2);
      // console.log(val);
      // if(!val)return false
      return true
    } else {
        console.log('checkpw went wrong');
        return false
      }
  },

  admin: async function(id){
      try {
        //console.log('linea 71 datacontroler.js');
        const datajson = await fs.readFile('./public/static/json/entradas.json', 'utf-8');
        //console.log('linea 73 datacontroler.js');
        const entradas = JSON.parse(datajson);
      //  console.log("entradas es ", entradas);
        // Busca el objeto con el id correspondiente
        const entrada = entradas.find(item => item.id === id);
      //  console.log("entrada es ", entrada);
        // Si se encuentra la entrada, la variable `entrada` tendrá el objeto correspondiente
        // if (entrada) {
        //   console.log('Entrada encontrada:', entrada);
        // } else {
        //   console.log('Entrada no encontrada');
        // }
        if(!id){
          console.log('nueva entrada en admin en linea 86 datacontroler.js');
          let nuevaEntrada = {
            entrada:{
              id:'',
              new:true,
              tipo: '',
              frontpage: true,
              titulo:'',
              fecha:'',
              dias:'',
              horario:'',
              lugar:'',
              descripcion:'',
              tallerista:'',
              organiza:'',
              fotos:[],
              audios:[],
              videolink:'',
            }
          }
          // console.log(nuevanoticia);
          let dataobj = nuevaEntrada;
          return dataobj
        }
        console.log('encontró entrada del JSON linea 110 en datacontroler.js');
        let dataobj = entrada;
        console.log(dataobj);
        return dataobj
      } catch (e) {
        console.log('editar entrada en datacontroler.js error',e);
        return false;
      }
    },

  datainput: {
    entrada: async function(content){
      console.log('writing entrada');
      let simplefields = ['titulo','id','descripcion','tallerista','fecha','dias','tipo', 'frontpage','organiza','horario','fotos','audios', 'videolink'];
      let updateobj = {};
      for (let x=0;x<simplefields.length;x++){
        updateobj[simplefields[x]]=content[simplefields[x]];
      }
      //missing: audios, images,
      //images
      // let newimages = [];
      // let x=0;
      // if(content.deleteimages){
      //   //delete images from hdd BEFORE putting new one in as they could be "replaced"
      //   for (x=0;x<content.deleteimages.length;x++){
      //     let delpath = "."+content.deleteimages[x];
      //     if(!fs.existsSync(delpath))continue;
      //     //check for malformed strings:
      //     if(content.deleteimages[x].substring(0,'/public/files/images/'.length)!='/public/files/images/')continue;
      //     if(content.deleteimages[x].indexOf('..')>-1)continue;
      //     //should we move or just delete files?
      //     //move: fs.renameSync(delpath, './private/deleted'+content.deleteimages[x]);
      //     //delete:
      //     fs.unlinkSync(delpath);
      //   }
      // }
      // if(content.deleteaudios){
      //   //delete audios from hdd BEFORE putting new one in as they could be "replaced"
      //   for (x=0;x<content.deleteaudios.length;x++){
      //     let delpath = "."+content.deleteaudios[x];
      //     if(!fs.existsSync(delpath))continue;
      //     //check for malformed strings:
      //     if(content.deleteaudios[x].substring(0,'/public/files/audios/'.length)!='/public/files/audios/')continue;
      //     if(content.deleteaudios[x].indexOf('..')>-1)continue;
      //     //should we move or just delete files?
      //     //move: fs.renameSync(delpath, './private/deleted'+content.deleteaudios[x]);
      //     //delete:
      //     fs.unlinkSync(delpath);
      //   }
      // }
      // if(content.images){
      //   console.log('saving images',content.images);
      //   let imgpath = './public/files/images/'+cdate.getFullYear()+'/'+cdate.getMonth();
      //   if(!fs.existsSync(imgpath))fs.mkdirSync(imgpath,{recursive:true});
      //   imgpath+='/';
      //   for (x=0;x<content.images.length;x++){
      //     let imgname = content.images[x].filename;
      //     imgname=this.chooseNewName(imgpath,imgname);
      //     imgurl = imgpath.substring(1)+imgname;
      //     if(!imgname){
      //       console.log('imagename not allowed?',imgname,content.images[x].filename);
      //       continue;
      //     }
      //     console.log('save image as',imgname,'in',imgpath);
      //     let savedimg = await saveImage(imgpath+imgname, content.images[x].data, 640, 480);
      //     console.log('saved image?',savedimg);
      //     if(savedimg)newimages.push({
      //       url:imgurl,
      //       title: content.imagetitles[x],
      //     });
      //   }
      // }
      //audios
      // let newaudios = [];
      // if(content.audios && content.audios.length>0){
      //   let audiopath = './public/files/audios/'+cdate.getFullYear()+'/'+cdate.getMonth();
      //   if(content.tipo=='resumensemanal')audiopath='./public/files/audios/resumensemanal';
      //   //podemos tambien filtrar los capitulos de columnas por columna
      //   if(!fs.existsSync(audiopath))fs.mkdirSync(audiopath,{recursive:true});
      //   audiopath+='/';
      //   for (x=0;x<content.audios.length;x++){
      //     let audioname = content.audios[x].filename;
      //     audioname=this.chooseNewName(audiopath,audioname);
      //     if(!audioname){
      //       console.log('audio not allowed?',audioname,content.audios[x].filename);
      //       continue;
      //     }
      //     //save audio to disk
      //     fs.writeFileSync(audiopath+audioname,content.audios[x].data);
      //     newaudios.push({
      //       url:audiopath.substring(1)+audioname,
      //       description: content.audios[x].description,
      //       //id? we dont save audio in db
      //     });
      //   }
      // }

      //videolink to youtube
      // if(content.videolink && content.videolink!='' && content.videolink.indexOf('iframe')==-1){
      //   //we dont support iframe-mode
      //   let idstart = content.videolink.indexOf('=')+1
      //   if(idstart==0){
      //     //videolink es de la forma https://youtu.be/MVxfjY-2K5c
      //     idstart = content.videolink.indexOf('youtu.be/')
      //     if(idstart>-1)idstart+='youtu.be/'.length
      //   }
      //   if(idstart>-1){
      //     let ytid = content.videolink.substring(idstart)
      //     if(ytid.indexOf('&')>-1)ytid = ytid.substring(0,ytid.indexOf('&'))
      //     if(ytid.indexOf('?')>-1)ytid = ytid.substring(0,ytid.indexOf('?'))
      //     updateobj.videolink = {
      //       url:content.videolink,
      //       iframe : 'https://www.youtube.com/embed/'+ytid
      //     }
      //     //check for image:
      //     if(newimages.length==0 && content.isnew){
      //       let previmg = await fetch(`https://img.youtube.com/vi/${ytid}/hqdefault.jpg`)
      //       let imgpath = './public/files/images/'+cdate.getFullYear()+'/'+cdate.getMonth();
      //       if(!fs.existsSync(imgpath))fs.mkdirSync(imgpath,{recursive:true});
      //       imgpath+='/';
      //       imgpath+=ytid+'.jpg'
      //       try {
      //         let res = await fetch(`https://img.youtube.com/vi/${ytid}/hqdefault.jpg`)
      //           if(res.ok){
      //             let previmg = await res.buffer()
      //             fs.writeFileSync(imgpath,previmg)
      //             newimages.push({
      //               url:imgpath.substring(1),
      //               title: 'prevista youtube',
      //             });
      //             console.log('downloaded youtube-preview-image');
      //           }
      //       } catch (e) {
      //         console.log('could not download previewimage from youtube',e);
      //       }
      //     }
      //   }
      // }else{//end of videolink to youtube
      //   //no hay videolink pero quiza hay que borrar viejo?
      //   //updateobj.videolink = null
      // }//end of videolink to youtube
      console.log('la entrada is new?',content.new);
      const data = await fs.readFile('./public/static/json/entradas.json', 'utf-8');
      const entradas = JSON.parse(data);
      console.log("entradas de linea 264 datacontroler es :", entradas);
      if(content.new===true ){
        updateobj.audios=newaudios;
        updateobj.images = newimages;
        console.log('updateobject:',updateobj);

        try {
            console.log("estoy en linea 258 de datacontroler.js");
            //const nuevaEntrada = req.body;
            console.log("updateobj es :", updateobj);
            console.log("content es :", content);
            entradas.push(updateobj);
            await fs.writeFile('./public/static/json/entradas.json', JSON.stringify(entradas, null, 2));
            console.log("entradas de linea 267 datacontroler es :", entradas);
            return true;
          } catch (error) {
            console.error(error);
            res.status(500).send('Error al agregar la entrada en 271 de datacontroler.js');
          }

        //   let newentrada = new Noticia(updateobj);
        //   let savednoticia = await newnoticia.save();
        //   console.log('saved new article',savednoticia._id, savednoticia.title);
        //   return savednoticia;
        // } catch (e) {
        //   console.log(e);
        //   return false;
        // }
      }else{

        try {
          const oldentrada = entradas.find(item => item.id === content.id);
          if(!oldentrada)return false;
          console.log('linea 287 de datacontroler: old entrada es ',oldentrada.title, oldentrada.id);
          // if(content.deleteimages){
          //   for (x=0;x<content.deleteimages.length;x++){
          //     for(let y=0;y<oldnoticia.images.length;y++){
          //       if(oldnoticia.images[y].url==content.deleteimages[x]){
          //         oldnoticia.images.splice(y,1);
          //         break;
          //       }
          //     }
          //   }
          // }
          // if(content.deleteaudios){
          //   for (x=0;x<content.deleteaudios.length;x++){
          //     for(let y=0;y<oldnoticia.audios.length;y++){
          //       if(oldnoticia.audios[y].url==content.deleteaudios[x]){
          //         oldnoticia.audios.splice(y,1);
          //         break;
          //       }
          //     }
          //   }
          // }
          // for (x=0;x<newimages.length;x++){
          //   oldnoticia.images.push(newimages[x]);
          // }
          // for (x=0;x<newaudios.length;x++){
          //   oldnoticia.audios.push(newaudios[x]);
          // }

          if(oldentrada.videolink && (content.videolink=='' || !content.videolink)){
            console.log('delete videolink', oldentrada.videolink, content.videolink);
            // delete oldnoticia.videolink
            oldentrada.videolink = undefined
          }
          entradas.push(content);
          await fs.writeFile('./public/static/json/entradas.json', JSON.stringify(entradas, null, 2));
          console.log("entradas de linea 322 datacontroler es :", entradas);
          return true;
          // let savedentrada = await oldentrada.save();
          // console.log('updated entrada',savedentrada);
          // return savedentrada;
        } catch (e) {
          console.log(e);
          return false;
        }
      }
    }
  },


  // userHashPassword: async function(password){
  //     //Hash password:
  //     const salt = await bcrypt.genSalt(12);
  //     const hashedPassword = await bcrypt.hash(password,salt);
  //     return hashedPassword;
  //   },
  //
  //   admin.password = await this.userHashPassword(admin.password);

};

module.exports = datacontroler;
