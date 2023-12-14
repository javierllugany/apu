const fs = require('fs').promises;
//const bodyParser = require('body-parser');
const express = require('express');
//const Entrada = require('./public/static/json/entradas.json');
//const sharp = require('sharp'); //para trabajar archivos de imagen, instalé una version vieja porque es muy viejo el node y el npm que tengo
const fetch = require('node-fetch');
const { exec } = require('child_process');

const fs1 = require('fs');

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
        if(!id){
          console.log('nueva entrada en admin en linea 80 datacontroler.js');
          let nuevaEntrada = {
            entrada:{
              id:'',
              new: true,
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
          // Genera un número al azar con 6 cifras
          let azarId="1";
          for (var i = 6; i>5; i++) {
            azarId= Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
            const comparanewId = await entradas.find(item => item.id === azarId);
            if(!comparanewId){
              nuevaEntrada.entrada.id=azarId;
              i=0;
            }
          }
          let dataobj = nuevaEntrada;
          console.log('linea 111 datacontroler id es: ', dataobj.entrada.id);
          return dataobj
        }
        console.log('encontró entrada en el JSON linea 114 en datacontroler.js');
        let dataobj = entrada;
        console.log(dataobj);
        return dataobj
      } catch (e) {
        console.log('editar entrada en linea 119 datacontroler.js error',e);
        return false;
      }
    },

  datainput: {
    chooseNewName: function(path,fname){
      let filename = fname.toLowerCase();
      let allowed = 'abcdefghijklmnopqrstuvwxyz0123456789.-';
      let allowedExt='png,jpg,mp3,ogg,gif,jpeg';
      for (let x=0;x<filename.length;x++){
        if(allowed.indexOf(filename[x])==-1)filename[x]='-';
      }
      console.log('new filename',filename);
      let ext = filename.substring(filename.lastIndexOf('.')+1);
      if(allowedExt.indexOf(ext)==-1)return false;
      ext='.'+ext;
      if(!fs1.existsSync(path+filename))return filename;
      let filen=filename.substring(0,filename.length-ext.length);
      let n=0;
      while(fs1.existsSync(path+filen+n+ext)){
        n++;
        if(n==20)filen+='-';
        if(n==30)filen+='--';
        if(n>100)break;
      }
      return filen+n+ext;
  },
    entrada: async function(content){
      //console.log("linea 123 datacontroler content es: ", content);
      let simplefields = ['id','new','tipo','frontpage','titulo','fecha','dias','horario','lugar','descripcion','tallerista','organiza','fotos','audios', 'videolink'];
      let updateobj = {};
      for (let x=0;x<simplefields.length;x++){
        updateobj[simplefields[x]]=content[simplefields[x]];
      }
      //missing: audios, fotos,
      //fotos
      let newfotos = [];
      let x=0;
      if(content.eliminarfotos){
        //delete fotos from hdd BEFORE putting new one in as they could be "replaced"
        for (x=0;x<content.eliminarfotos.length;x++){
          let delpath = "."+content.eliminarfotos[x];
          if(!fs1.existsSync(delpath))continue;
          //check for malformed strings:
          if(content.eliminarfotos[x].substring(0,'/public/files/fotos/'.length)!='/public/files/fotos/')continue;
          if(content.eliminarfotos[x].indexOf('..')>-1)continue;
          //should we move or just delete files?
          //move: fs.renameSync(delpath, './private/deleted'+content.eliminarfotos[x]);
          //delete:
          fs.unlinkSync(delpath);
        }
      }
      if(content.eliminaraudios){
        //delete audios from hdd BEFORE putting new one in as they could be "replaced"
        for (x=0;x<content.eliminaraudios.length;x++){
          let delpath = "."+content.eliminaraudios[x];
          if(!fs1.existsSync(delpath))continue;
          //check for malformed strings:
          if(content.eliminaraudios[x].substring(0,'/public/files/audios/'.length)!='/public/files/audios/')continue;
          if(content.eliminaraudios[x].indexOf('..')>-1)continue;
          //should we move or just delete files?
          //move: fs.renameSync(delpath, './private/deleted'+content.eliminaraudios[x]);
          //delete:
          fs.unlinkSync(delpath);
        }
      }
      if(content.fotos){
        console.log('linea 165 datacontroler - saving fotos',content.fotos);
        //let imgpath = './public/files/fotos/'+cdate.getFullYear()+'/'+cdate.getMonth();
        let imgpath = './public/files/fotos';
        if(!fs1.existsSync(imgpath))fs1.mkdirSync(imgpath,{recursive:true});
        imgpath+='/';
        let cdate = new Date();
        for (x=0;x<content.fotos.length;x++){
          let imgname = cdate.getFullYear()+'-'+cdate.getMonth()+'-'+content.fotos[x].filename;
          imgname=this.chooseNewName(imgpath,imgname);
          imgurl = imgpath.substring(1)+imgname;
          if(!imgname){
            console.log('imagename not allowed?',imgname,content.fotos[x].filename);
            continue;
          }
          console.log('linea 205 datacontroler - save image as',imgname,'in',imgpath);
        //  let savedimg = await saveImage(imgpath+imgname, content.fotos[x].data, 640, 480);
          let savedimg = await saveImage(imgpath+imgname, content.fotos[x].data);
          console.log('linea 216 datacontroler - saved image?',savedimg);
          //let savedimgnew = await saveImage(imgpath+imgname, content.fotos[x].data, 640, 480);
          if(savedimg)newfotos.push({
            url:imgurl,
            title: content.imagetitles[x],
          });
        }
      }
      //audios
      let newaudios = [];
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
      //     if(newfotos.length==0 && content.isnew){
      //       let previmg = await fetch(`https://img.youtube.com/vi/${ytid}/hqdefault.jpg`)
      //       let imgpath = './public/files/fotos/'+cdate.getFullYear()+'/'+cdate.getMonth();
      //       if(!fs.existsSync(imgpath))fs.mkdirSync(imgpath,{recursive:true});
      //       imgpath+='/';
      //       imgpath+=ytid+'.jpg'
      //       try {
      //         let res = await fetch(`https://img.youtube.com/vi/${ytid}/hqdefault.jpg`)
      //           if(res.ok){
      //             let previmg = await res.buffer()
      //             fs.writeFileSync(imgpath,previmg)
      //             newfotos.push({
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
      console.log("linea 297 datacontroler entradas es :", entradas);
      if(content.new==="true"){
        updateobj.audios = newaudios;
        updateobj.fotos = newfotos;
        console.log('linea 301 datacontroler updateobject:',updateobj);

        try {
            console.log("estoy en linea 304 de datacontroler.js");
            //const nuevaEntrada = req.body;
            //console.log("linea 265 datacontroler updateobj es :", updateobj);
            //console.log("linea 266 datacontroler content es :", content);
            entradas.push(updateobj);
            await fs.writeFile('./public/static/json/entradas.json', JSON.stringify(entradas, null, 2));
            //console.log("entradas de linea 269 datacontroler es :", entradas);
            return true;
          } catch (error) {
            console.error(error);
            res.status(500).send('Error al agregar la entrada en 273 de datacontroler.js');
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
          console.log('linea 330 de datacontroler: old entrada es ',oldentrada.title, oldentrada.id);
          // if(content.eliminarfotos){
          //   for (x=0;x<content.eliminarfotos.length;x++){
          //     for(let y=0;y<oldnoticia.fotos.length;y++){
          //       if(oldnoticia.fotos[y].url==content.eliminarfotos[x]){
          //         oldnoticia.fotos.splice(y,1);
          //         break;
          //       }
          //     }
          //   }
          // }
          // if(content.eliminaraudios){
          //   for (x=0;x<content.eliminaraudios.length;x++){
          //     for(let y=0;y<oldnoticia.audios.length;y++){
          //       if(oldnoticia.audios[y].url==content.eliminaraudios[x]){
          //         oldnoticia.audios.splice(y,1);
          //         break;
          //       }
          //     }
          //   }
          // }
          // for (x=0;x<newfotos.length;x++){
          //   oldnoticia.fotos.push(newfotos[x]);
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
          console.log("linea 365 datacontroler entradas es :", entradas);
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

//async function saveImage(path, data, width, height){
  async function saveImage(path, data){
  console.log('linea 391 datacontroler - save image',path);
  try {
    let ending = path.substring(path.lastIndexOf('.')+1)
    // console.log('ending:',ending);
    if(ending=='gif'){
      //dont resize
      console.log('writing gif');
      fs.writeFileSync(path,data)
      return true
    }
    //ACTIVAR CUANDO EN EL SERVIDOR PUEDA INSTALAR SHARP
    // let savedImageToDisk = await sharp(data)
    // .resize({
    //   width:width,
    //   height:height,
    //   withoutEnlargement: true,
    //   fit:'inside'})
    //   .toFile(path);

      //DESACTIVAR CUANDO EN EL SERVIDOR PUEDA INSTALAR SHARP
      // Guardar la imagen en el disco.
      fs.writeFile(path, data, (err) => {
        if (err) {
          console.error('Error al guardar la imagen:', err);
        } else {
          console.log('Imagen guardada exitosamente en:');
        }
      });
      console.log('Imagen guardada exitosamente en:');
      return true;
  } catch (e) {
    console.log('Error al guardar la imagen:', e);
    return false;
  }
}

// Guardar la imagen en el disco.
// fs.writeFile(imagePath, imageData, 'binary', (err) => {


module.exports = datacontroler;
