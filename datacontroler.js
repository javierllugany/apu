const fs = require('fs').promises;
const express = require('express');
const fetch = require('node-fetch');
const { exec } = require('child_process');
const gm = require('gm');

const fs1 = require('fs');

const datacontroler = {
  frontpage: async function(){
    try {
      const datajson = await fs.readFile('./public/static/json/entradas.json', 'utf-8');
      const entradas = JSON.parse(datajson);
      let dataFrontpage=[];
      for (var i = 0; i < entradas.length; i++) {
        if (entradas[i].frontpage===true || entradas[i].frontpage==="on") {
          dataFrontpage.push(entradas[i]);
        }
      }
      console.log('linea 20 datacontroler dataFrontpage es : ', dataFrontpage);
      return dataFrontpage;
    } catch (e) {
        console.log(e);
        return false;
      }
  },

  ubicacion: async function(){
    let data=""
    return data;
  },

  actividad: async function(id){
    try {
      const datajson = await fs.readFile('./public/static/json/entradas.json', 'utf-8');
      const entradas = JSON.parse(datajson);
      const entrada = entradas.find(item => item.id === id);
      if(!id){
        console.log('linea 34 datacontroler el id no coincide en json');
        console.log('Error al abrir la entrada:', id);
        return false;
      } else {
      return entrada;
      } } catch (e) {
        console.log(e);
        return false;
      }
  },

  listaActividades: async function(){
    try {
      const datajson = await fs.readFile('./public/static/json/entradas.json', 'utf-8');
      const entradas = JSON.parse(datajson);
      return entradas;
    } catch (e) {
        console.log(e);
        return false;
      }
  },

  talleres: async function(){
    try {
      const datajson = await fs.readFile('./public/static/json/entradas.json', 'utf-8');
      const entradas = JSON.parse(datajson);
      let dataActividades=[];
      for (var i = 0; i < entradas.length; i++) {
        if (entradas[i].tipo==="Taller") {
          dataActividades.push(entradas[i]);
        }
      }
      return dataActividades;
    } catch (e) {
        console.log(e);
        return false;
      }
  },

  eventos: async function(){
    try {
      const datajson = await fs.readFile('./public/static/json/entradas.json', 'utf-8');
      const entradas = JSON.parse(datajson);
      let dataActividades=[];
      for (var i = 0; i < entradas.length; i++) {
        if (entradas[i].tipo==="Evento") {
          dataActividades.push(entradas[i]);
        }
      }
      return dataActividades;
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
        console.log('Contraseña equivocada');
        return false
      }
  },

  admin: async function(id){
      try {
        console.log('linea 71 datacontroler.js id es: ', id);
        const datajson = await fs.readFile('./public/static/json/entradas.json', 'utf-8');
        //console.log('linea 73 datacontroler.js');
        const entradas = JSON.parse(datajson);
      //  console.log("entradas es ", entradas);
        // Busca el objeto con el id correspondiente
        const entrada = entradas.find(item => item.id === id);
        console.log('linea 82 datacontroler.js id es: ', id);
        //console.log('linea 83 datacontroler.js item.id es: ', item.id);
        if(!id){
          console.log('nueva entrada en admin en linea 80 datacontroler.js');
          let nuevaEntrada = {
              id:'',
              tipo: '',
              frontpage: true,
              titulo:'',
              fechaInicio:'',
              programa:'',
              lugar:'',
              descripcion:'',
              tallerista:'',
              organiza:'',
              fotos:[],
              audios:[],
              videolink:'',
          }
          // Genera un número al azar con 6 cifras
          let azarId="1";
          for (var i = 6; i>5; i++) {
            azarId= Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
            const comparanewId = await entradas.find(item => item.id === azarId);
            if(!comparanewId){
              nuevaEntrada.id=azarId;
              i=0;
            }
          }
          let dataobj = nuevaEntrada;
          console.log('linea 105 datacontroler id es: ', dataobj.id);
          return dataobj
        }
        let dataobj = entrada;
        console.log('encontró entrada en el JSON linea 109 en datacontroler', dataobj);
        return dataobj
      } catch (e) {
        console.log('editar entrada en linea 112 datacontroler error',e);
        return false;
      }
    },

  borrar: async function(id){
        console.log('linea 119 datacontroler id es: ', id);
        const datajson = await fs.readFile('./public/static/json/entradas.json', 'utf-8');
        const entradas = JSON.parse(datajson);
        const entrada = entradas.find(item => item.id === id);
        if(!id){
          console.log('linea 124 datacontroler el id no coincide en json');
          console.log('Error al borrar la entrada:', id);
          return false;
        } else {
          // crear copia de seguridad de entradas.json
          let carpetaCopiaSeguridad = './public/static/copiaSeguridad';
          if(!fs1.existsSync(carpetaCopiaSeguridad))fs1.mkdirSync(carpetaCopiaSeguridad,{recursive:true});
          carpetaCopiaSeguridad+='/';
          let copiaName = carpetaCopiaSeguridad+'copiadeseguridad'+'-entradas.json';
          try{
            // Copying the file to a the same name
            await fs.copyFile('./public/static/json/entradas.json', copiaName);
          } catch (error) {
            console.error(error);
            res.status(500).send('Error al hacer json de seguridad en 137 de datacontroler');
          }
        }
        //eliminar fotos del servidor
        let newfotos = [];
        let x=0;
        if(entrada.fotos.length>=0){
          console.log('linea 145 datacontroler hay fotos para eliminar del servidor', entrada.fotos);
          //delete fotos from hdd
          for (x=0;x<entrada.fotos.length;x++){
            let delpath = "."+entrada.fotos[x].url;
            console.log('linea 149 datacontroler delpath es', delpath);
            if(fs1.existsSync(delpath)){
            console.log('linea 151 datacontroler delpath existe en /public/files/fotos');
            try {
              //delete:
               fs1.unlinkSync(delpath);
            } catch (e) {
              console.log('linea 156 datacontroler no se elimino la imagen', delpath);
                console.log('Error al borrar la imagen:', e);
                return false;
              }
            } else {
              console.log('linea 161 datacontroler delpath no existe en /public/files/fotos');
              continue;
            }
          }
        }
        try {
          const indiceEntradaBorrada=entradas.findIndex(item => item.id === id);
          entradas.splice(indiceEntradaBorrada, 1);
          await fs.writeFile('./public/static/json/entradas.json', JSON.stringify(entradas, null, 2));
          console.log("linea 204 datacontroler el json ya esta actualizado sin la entrada id: ", id);
          return true;
        } catch (error) {
          console.error(error);
          res.status(500).send('Error al borrar la entrada del json en 208 datacontroler');
        }
    },

  datainput: {
    chooseNewName: function(path,fname){
      let filename = fname.toLowerCase();
      let allowedExt='png,jpg,mp3,ogg,gif,jpeg';
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
      let simplefields = ['id','tipo','frontpage','titulo','fechaInicio','programa','lugar','descripcion','tallerista','organiza','fotos','audios', 'videolink'];
      let updateobj = {};
      for (let x=0;x<simplefields.length;x++){
        updateobj[simplefields[x]]=content[simplefields[x]];
      }
      //missing: audios, fotos,
      let newfotos = [];
      let x=0;
      console.log('linea 237 datacontroler content.eliminarfotos[0].url es: ', content.eliminarfotos[0]);
    if(content.eliminarfotos && content.eliminarfotos.length > 0){
        console.log('linea 239 datacontroler hay fotos para eliminar', content.eliminarfotos);
        //delete fotos from hdd BEFORE putting new one in as they could be "replaced"
        for (x=0;x<content.eliminarfotos.length;x++){
          let delpath = "."+content.eliminarfotos[x].url;
          if(fs1.existsSync(delpath)){
          try {
            //delete:
             fs1.unlinkSync(delpath);
          } catch (e) {
              console.log('Error al borrar la imagen:', delpath, e);
              return false;
            }
          } else {
            console.log('linea 156 datacontroler delpath no existe en /public/files/fotos');
            continue;
          }
        }
      }

      if(content.eliminaraudios){
        for (x=0;x<content.eliminaraudios.length;x++){
          let delpath = "."+content.eliminaraudios[x];
          if(fs1.existsSync(delpath)){
          try {
            //delete:
             fs1.unlinkSync(delpath);
          } catch (e) {
              console.log('Error al borrar el audio:', delpath, e);
              return false;
            }
          } else {
            console.log('linea 156 datacontroler delpath no existe en /public/files/audios');
            continue;
          }
        }
      }
      if(content.fotos){
        let imgpath = './public/files/fotos';
        if(!fs1.existsSync(imgpath))fs1.mkdirSync(imgpath,{recursive:true});
        imgpath+='/';
        let cdate = new Date();
        for (x=0;x<content.fotos.length;x++){
          extfilename=content.fotos[x].filename;
          let ext = extfilename.substring(extfilename.lastIndexOf('.')+1);
          let imgname = cdate.getFullYear()+'-'+(cdate.getMonth()+1)+'-foto.'+ext;
          imgname= await this.chooseNewName(imgpath,imgname);
          imgurl = imgpath.substring(1)+imgname;
          if(!imgname){
            console.log('imagename not allowed?',imgname,content.fotos[x].filename);
            continue;
          }
          let savedimg = await saveImage(imgpath+imgname, content.fotos[x].data);
          if(savedimg)newfotos.push({
            url:imgurl,
          });
        }
      }
      //audios
      let newaudios = [];
      if(content.audios && content.audios.length>-1){
        let audiopath = './public/files/audios';
        if(!fs1.existsSync(audiopath))fs1.mkdirSync(audiopath,{recursive:true});
        audiopath+='/';
        let cdate = new Date();
        for (x=0;x<content.audios.length;x++){
          extfilename=content.audios[x].filename;
          let ext = extfilename.substring(extfilename.lastIndexOf('.')+1);
          let audioname = cdate.getFullYear()+'-'+(cdate.getMonth()+1)+'-audio.'+ext;
          audioname=this.chooseNewName(audiopath,audioname);
          if(!audioname){
            console.log('audio not allowed?',audioname,content.audios[x].filename);
            continue;
          }
          //save audio to disk
          fs1.writeFileSync(audiopath+audioname,content.audios[x].data);
          newaudios.push({
            url:audiopath.substring(1)+audioname,
            description: content.audios[x].description,
          });
        }
      }
      //videolink to youtube
      if(content.videolink && content.videolink!='' && content.videolink.indexOf('iframe')==-1){
        //we dont support iframe-mode
        let idstart = content.videolink.indexOf('=')+1
        if(idstart==0){
          //videolink es de la forma https://youtu.be/MVxfjY-2K5c
          idstart = content.videolink.indexOf('youtu.be/')
          if(idstart>-1)idstart+='youtu.be/'.length
        }
        if(idstart>-1){
          let ytid = content.videolink.substring(idstart)
          if(ytid.indexOf('&')>-1)ytid = ytid.substring(0,ytid.indexOf('&'))
          if(ytid.indexOf('?')>-1)ytid = ytid.substring(0,ytid.indexOf('?'))
          updateobj.videolink = {
            url:content.videolink,
            iframe : 'https://www.youtube.com/embed/'+ytid
          }
          //check for image:
          if(newfotos.length==0){
            let previmg = await fetch(`https://img.youtube.com/vi/${ytid}/hqdefault.jpg`)
            let cdate = new Date();
            let imgpath = './public/files/fotos/'+cdate.getFullYear()+'/'+(cdate.getMonth()+1);
            if(!fs1.existsSync(imgpath))fs1.mkdirSync(imgpath,{recursive:true});
            imgpath+='/';
            imgpath+=ytid+'.jpg'
            try {
              let res = await fetch(`https://img.youtube.com/vi/${ytid}/hqdefault.jpg`)
                if(res.ok){
                  let previmg = await res.buffer()
                  fs1.writeFileSync(imgpath,previmg)
                  newfotos.push({
                    url:imgpath.substring(1),
                    title: 'prevista youtube',
                  });
                  console.log('downloaded youtube-preview-image');
                }
            } catch (e) {
              console.log('could not download previewimage from youtube',e);
            }
          }
        }
      }else{//end of videolink to youtube
        //no hay videolink pero quiza hay que borrar viejo?
        //updateobj.videolink = null
        updateobj.videolink = '';
      }//end of videolink to youtube
      //ACA renombra el archivo json para que guarde una COPIA DE SEGURIDAD
      //en otra carpeta para que quede la seguridad antes de cambiar alguna cosa)
      let carpetaCopiaSeguridad = './public/static/copiaSeguridad';
      if(!fs1.existsSync(carpetaCopiaSeguridad))fs1.mkdirSync(carpetaCopiaSeguridad,{recursive:true});
      carpetaCopiaSeguridad+='/';
      let copiaName = carpetaCopiaSeguridad+'copiadeseguridad'+'-entradas.json';
      try{
        // Copying the file to a the same name
        await fs.copyFile('./public/static/json/entradas.json', copiaName);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al hacer json de seguridad en 292 de datacontroler');
      }
      const data = await fs.readFile('./public/static/json/entradas.json', 'utf-8');
      const entradas = JSON.parse(data);
      const oldentrada = entradas.find(item => item.id === content.id);
      if(!oldentrada){
        console.log("linea 294 datacontroler la entrada es nueva");
        updateobj.audios = newaudios;
        updateobj.fotos = newfotos;
        console.log('linea 297 datacontroler updateobject:',updateobj);
        try {
            entradas.push(updateobj);
            await fs.writeFile('./public/static/json/entradas.json', JSON.stringify(entradas, null, 2));
            console.log("linea 301 datacontroler el json ya esta actualizado con la nueva entrada");
            return true;
          } catch (error) {
            console.error(error);
            res.status(500).send('Error al agregar la entrada en 305 datacontroler');
          }
      }else{
        try {
          console.log('linea 295 datacontroler: la entrada es vieja',oldentrada.titulo, oldentrada.id);
          console.log("linea 296 datacontroler content.eliminarfotos es: ", content.eliminarfotos);
          if(content.eliminarfotos){
            for (x=0;x<content.eliminarfotos.length;x++){
              console.log("linea 299 datacontroler content.eliminarfotos[x].url es: ", content.eliminarfotos[x].url);
              for(let y=0;y<oldentrada.fotos.length;y++){
                console.log("linea 301 datacontroler oldentrada.fotos[y].url es: ", oldentrada.fotos[y].url);
                if(oldentrada.fotos[y].url==content.eliminarfotos[x].url){
                  oldentrada.fotos.splice(y,1);
                  break;
                }
              }
            }
          }
          if(content.eliminaraudios){
            for (x=0;x<content.eliminaraudios.length;x++){
              for(let y=0;y<oldentrada.audios.length;y++){
                if(oldentrada.audios[y].url==content.eliminaraudios[x].url){
                  oldentrada.audios.splice(y,1);
                  break;
                }
              }
            }
          }
          for (x=0;x<newfotos.length;x++){
            oldentrada.fotos.push(newfotos[x]);
          }
          for (x=0;x<newaudios.length;x++){
            oldentrada.audios.push(newaudios[x]);
          }
          console.log("linea 322 datacontroler la entrada a insertar en json es por ahora :", updateobj);
          updateobj.fotos = oldentrada.fotos;
          updateobj.audios = oldentrada.audios;
          console.log("linea 325 datacontroler la entrada a insertar en json es por ahora :", updateobj);

          // if(oldentrada.videolink && (content.videolink=='')){
          //   console.log('delete videolink', oldentrada.videolink, content.videolink);
          //   // delete oldentrada.videolink
          //   //oldentrada.videolink = undefined
          //   updateobj.videolink = '';
          // }

//ARREGLAR PARA QUE LA VIEJA ENTRADA SE MODIFIQUE Y NO AGREGUE OTRA NUEVA
          const indiceOldentrada=entradas.findIndex(item => item.id === content.id);
          console.log("linea 347 datacontroler indice de vieja entrada en json es :", indiceOldentrada);
          console.log("linea 348 datacontroler la entrada a insertar en json es :", updateobj);
          entradas.splice(indiceOldentrada, 1, updateobj);
          // let simplefields = ['id','tipo','frontpage','titulo','fechaInicio','programa','lugar','descripcion','tallerista','organiza'];
          // let updateobj = {};
          // for (let x=0;x<simplefields.length;x++){
          //   oldentrada[simplefields[x]]=updateobj[simplefields[x]];
          // }
          //entradas.push(content);
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
};

//async function saveImage(path, data, width, height){
  async function saveImage(path, data){
  try {
    let ending = path.substring(path.lastIndexOf('.')+1)
    // console.log('ending:',ending);
    if(ending=='gif'){
      //dont resize
      console.log('writing gif');
      fs.writeFileSync(path,data)
      return true
    }
      // Guardar la imagen en el disco.
      fs.writeFile(path, data, (err) => {
        if (err) {
          console.error('Error al guardar la imagen:', err);
        } else {
          console.log('Imagen guardada exitosamente');
        }
      });
      gm(path)
          .resize(640, 480)
          .write(path, function (err) {
              if(err) console.log(err);
              console.log("Done!")
          });
      return true;
  } catch (e) {
    console.log('Error al guardar la imagen:', e);
    return false;
  }
}

module.exports = datacontroler;
