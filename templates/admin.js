module.exports = function(dataobj){
  // let data = dataobj.entrada;
   let data = dataobj;
  console.log('linea 3 admin.js - data es: ', data);
  let x=0;
  let checked = {
    // taller: (data.tipo==='Taller') ? 'checked': '',
    // evento: (data.tipo==='Evento') ? 'checked': '',
    frontpage: (data.frontpage===true || data.frontpage==='true' || data.frontpage==='on') ? 'checked': '',
  }
  let h2nuevo='';
  let pestañaTitulo='';
  if (data.titulo==='') {
    h2nuevo='APU - CREAR NUEVA ENTRADA';
    pestañaTitulo='APU Crear Entrada';
  } else {
    h2nuevo='APU - EDITAR o ELIMINAR ENTRADA';
    pestañaTitulo='APU Editar Entrada';
  }
  let taller='';
  let evento='';
  if (data.tipo==="Evento") {
    evento='selected';
  } else {
    taller='selected';
  }
  let eliminarfotos=''
  for(x=0;x<data.fotos.length;x++){
    eliminarfotos+=`<li class="grideliminarfotoyaudio">
      <input class="editfotosdeEntrada" type="checkbox" id="eliminarfoto${x}" name="eliminarfotos${x}" value="${data.fotos[x].url}" ${checked.eliminarfotos}>
      <label class="editfotosdeEntrada" for="eliminarfoto${x}">Eliminar</label>
      <img class="editfotosdeEntrada" id="eliminarEditfotosdeEntrada${x}" src="${data.fotos[x].url}" alt="">
    </li>`
  }
  let eliminaraudios=''
  for(x=0;x<data.audios.length;x++){
    eliminaraudios+=`<li>
      <input type="checkbox" id="eliminaraudio${x}" name="eliminaraudios" value="${data.audios[x].url}">
      <label for="eliminaraudio${x}">Eliminar</label>
      <div class="Editaudiosyvideos">
        <p class=tituloAudio>${data.audios[x].description}</p>
        <div class="cuadrocontrol">
          <audio src="${data.audios[x].url}" controls=""></audio>
          <a href="${data.audios[x].url}" download>&#9196;</a>
        </div>
      </div>
    </li>`
  }
  let videolink = ''
  if(data.videolink && data.videolink.url)videolink = data.videolink.url
  let raw = `
  <!DOCTYPE html>
  <html lang="es" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title>${pestañaTitulo}</title>
      <link rel="shortcut icon" href="../public/static/logos/APU-icon.png" type="image/png">
      <link rel="stylesheet" href="../public/static/layout.css">
      <script src="/public/static/scripts/fileuploadstepper.js"></script>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300&display=swap" rel="stylesheet">
    </head>
    <body>
      <header class="modeloSubpag admin">
        <div id="pagAdmin">
          <h1>APU Club de Montaña</h1>
          <h2 class="admin">${h2nuevo}</h2>
          <div class="topMenu admin">
            <ul>
              <li><a href="/loginAdmin/logout">Cerrar Sesión</a></li>
              <li><a href="/admin/listaActividades">Ver y Editar Archivo de Entradas</a></li>
            </ul>
          </div>
          <div class="form admin">
            <form method="post" action="/admin/entradas" enctype="multipart/form-data">
              <input type="hidden" name="id" value="${data.id}">
              <ul>
                <li>
                  <label>Tipo</label>
                  <select class="admin" name="tipo" value="${data.tipo}">
                    <option value="Taller" ${taller}>Taller</option>
                    <option value="Evento" ${evento}>Evento</option>
                  </select>
                </li>
                <li>
                  <label for="enPaginaInicio">Publicar en Página Inicio</label>
                  <input type="checkbox" id="enPaginaInicio" name="frontpage" ${checked.frontpage}>
                </li>
                <li>
                  <label for="EditTitulo">Título</label>
                  <p><input id="EditTitulo" type="text" name="titulo" size="45" spellcheck="true"
                    value="${data.titulo}" class="admin" required></p>
                </li>
                <li>
                  <label for="EditFecha">Fecha de Inicio</label>
                  <input id="EditFecha" type="date" name="fechaInicio" class="admin" value="${data.fechaInicio}" required>
                </li>
                <li>
                  <label for="EditDias">Días y Horario</label>
                  <input id="EditDias" type="text" name="programa" class="admin" size="70" value="${data.programa}" required>
                </li>
                <li>
                  <label for="EditLugar">Lugar</label>
                  <p><input id="EditLugar" type="text" name="lugar" size="45" spellcheck="true"
                    value="${data.lugar}" class="admin" required></p>
                </li>
                <li>
                  <label for="EditDescripcion">Descripción</label>
                  <p><textarea id="EditDescripcion" type="text" name="descripcion" rows="20" cols="90"
                  spellcheck="true">${data.descripcion}</textarea></p>
                </li>
                <li>
                  <label for="EditTallerista">Tallerista</label>
                  <p><input id="EditTallerista" type="text" name="tallerista" size="45" spellcheck="true"
                    value="${data.tallerista}" class="admin"></p>
                </li>
                <li>
                  <label for="EditOrganiza">Organiza</label>
                  <p><input id="EditOrganiza" type="text" name="organiza" size="70" spellcheck="true"
                    value="${data.organiza}" class="admin" required></p>
                </li>
              </ul>
              <ul id="sumafotos">
                <li id="listaAgregarFotos" class="fotoUpload active">
                  <label for="agregarFotosEdittaller0">Agregar Fotos +</label>
                  <input type="file" onclick="deleteOldSelection(this)" onchange="showNextFileUploads(this)" id="agregarFotosEdittaller0" accept=".png, .jpeg, .jpg, .gif" name="foto1" value="">
                </li>
                <li id="listaAgregarFotos1" class="fotoUpload">
                  <label for="agregarFotosEdittaller1">Agregar Fotos +</label>
                  <input type="file" onclick="deleteOldSelection(this)" onchange="showNextFileUploads(this)" id="agregarFotosEdittaller1" accept=".png, .jpeg, .jpg, .gif" name="foto2" value="">
                </li>
                <li id="listaAgregarFotos2" class="fotoUpload">
                  <label for="agregarFotosEdittaller2">Agregar Fotos +</label>
                  <input type="file" onclick="deleteOldSelection(this)" onchange="showNextFileUploads(this)" id="agregarFotosEdittaller2" accept=".png, .jpeg, .jpg, .gif" name="foto3" value="">
                </li>
                <li id="listaAgregarFotos3" class="fotoUpload">
                  <label for="agregarFotosEdittaller3">Agregar Fotos +</label>
                  <input type="file" onclick="deleteOldSelection(this)" onchange="showNextFileUploads(this)" id="agregarFotosEdittaller3" accept=".png, .jpeg, .jpg, .gif" name="foto4" value="">
                </li>
              </ul>
              <ul class="editFotos" id="editFotos">
                ${eliminarfotos}
              </ul>
              <ul>
                <li class="audioUpload active" id="listaAgregarAudiosEdittaller">
                  <label class="uploadlabel" for="agregarAudios">Agregar Audios o Videos</label>
                  <input class="uploadinput" type="file" onchange="showNextFileUploads(this)" id="agregarAudios" name="audio1" value="">
                </li>
                <li class="audioUpload" id="listaAgregarAudiosEdittaller1" class="listaAgregarAudiosEdittaller">
                  <label class="uploadlabel" for="agregarAudios1">Agregar Audios o Videos</label>
                  <input class="uploadinput" type="file" onchange="showNextFileUploads(this)" id="agregarAudios1" name="audio2" value="">
                </li>
                <li class="audioUpload" id="listaAgregarAudiosEdittaller2" class="listaAgregarAudiosEdittaller">
                  <label class="uploadlabel" for="agregarAudios2">Agregar Audios o Videos</label>
                  <input class="uploadinput" type="file" onchange="showNextFileUploads(this)" id="agregarAudios2" name="audio3" value="">
                </li>
              </ul>
              <ul id="EditAudiosYVideos">
                ${eliminaraudios}
              </ul>
              <ul class="videourl">
                <li>
                  <label for="videolink" title="eg https://youtu.be/MVxfjY-2K5c o https://www.youtube.com/watch?v=MVxfjY-2K5c">Agregar link a youtube</label>
                  <input type="text" name="videolink" id="videolink" size="70" class="admin" value="${videolink}">
                </li>
              </ul>
              <button type="submit" class="submitEditEntrada botonFinal">GUARDAR Entrada y volver</button>
              <button type="button" class="EliminarEntrada botonFinal" id="botonELIMINAR" onclick="if(confirm('Quieres borrar esta entrada?'))location.href='/admin/borrar/${data.id}'">ELIMINAR Entrada</button>
            </form>
          </div>
        </div>
        <div class="footer">
        </div>
      </header>
    </body>
  </html>
    `;
    return raw;
}

//module.exports = template;
