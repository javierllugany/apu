module.exports = function(dataobj){
  // let data = dataobj.entrada;
   let data = dataobj;
  console.log('linea 3 admin.js - data es: ', data);
  let x=0;
  let checked = {
    // taller: (data.tipo==='Taller') ? 'checked': '',
    // evento: (data.tipo==='Evento') ? 'checked': '',
    frontpage: (data.frontpage===true) ? 'checked': '',
  }
  let eliminarfotos=''
  for(x=0;x<data.fotos.length;x++){
    eliminarfotos+=`<li class="grideliminarfotoyaudio">
      <div>
        <input type="checkbox" id="eliminarfoto${x}" name="eliminarfotos" value="${data.fotos[x].url}">
        <label for="eliminarfoto${x}">Eliminar</label>
        <img class="EditfotosdeEntrada" id="EliminarEditfotosdeEntrada${x}" src="${data.fotos[x].url}" alt="">
      </div>
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
      <title>APU Admin</title>
      <!-- <title>APU Editar Entrada</title> -->
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
          <h2 class="admin">APU - SUBIR NUEVA ENTRADA</h2>
          <!-- <h2 class="admin">APU - EDITAR o ELIMINAR ENTRADA</h2> -->
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
                    <option value="Taller">Taller</option>
                    <option value="Evento">Evento</option>
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
                  <input id="EditFecha" type="date" name="fechaInicio" class="admin" value="${data.fechaInicio}">
                </li>
                <li>
                  <label for="EditDias">Días y Horario de la Actividad</label>
                  <input id="EditDias" type="text" name="programa" class="admin" size="70" value="${data.programa}">
                </li>
                <li>
                  <label for="EditLugar">Lugar</label>
                  <p><input id="EditLugar" type="text" name="lugar" size="45" spellcheck="true"
                    value="${data.lugar}" class="admin"></p>
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
                    value="${data.organiza}" class="admin"></p>
                </li>
              </ul>
              <ul id="sumafotos">
                <li id="ListaAgregarFotos" class="fotoUpload active">
                  <label for="AgregarFotosEdittaller0">Agregar Fotos +</label>
                  <input type="file" onclick="deleteOldSelection(this)" onchange="showNextFileUploads(this)" id="AgregarFotosEdittaller0" accept=".png, .jpeg, .jpg, .gif" name="foto1" value="">
                </li>
                <li id="ListaAgregarFotos1" class="fotoUpload">
                  <label for="AgregarFotosEdittaller1">Agregar Fotos +</label>
                  <input type="file" onclick="deleteOldSelection(this)" onchange="showNextFileUploads(this)" id="AgregarFotosEdittaller1" accept=".png, .jpeg, .jpg, .gif" name="foto2" value="">
                </li>
                <li id="ListaAgregarFotos2" class="fotoUpload">
                  <label for="AgregarFotosEdittaller2">Agregar Fotos +</label>
                  <input type="file" onclick="deleteOldSelection(this)" onchange="showNextFileUploads(this)" id="AgregarFotosEdittaller2" accept=".png, .jpeg, .jpg, .gif" name="foto3" value="">
                </li>
                <li id="ListaAgregarFotos3" class="fotoUpload">
                  <label for="AgregarFotosEdittaller3">Agregar Fotos +</label>
                  <input type="file" onclick="deleteOldSelection(this)" onchange="showNextFileUploads(this)" id="AgregarFotosEdittaller3" accept=".png, .jpeg, .jpg, .gif" name="foto4" value="">
                </li>
              </ul>
              <ul class="EditFotos" id="EditFotos">
                ${eliminarfotos}
              </ul>
              <ul>
                <li class="audioUpload active" id="ListaAgregarAudiosEdittaller">
                  <label class="uploadlabel" for="AgregarAudios">Agregar Audios o Videos</label>
                  <input class="uploadinput" type="file" onchange="showNextFileUploads(this)" id="AgregarAudios" name="audio1" value="">
                </li>
                <li class="audioUpload" id="ListaAgregarAudiosEdittaller1" class="ListaAgregarAudiosEdittaller">
                  <label class="uploadlabel" for="AgregarAudios1">Agregar Audios o Videos</label>
                  <input class="uploadinput" type="file" onchange="showNextFileUploads(this)" id="AgregarAudios1" name="audio2" value="">
                </li>
                <li class="audioUpload" id="ListaAgregarAudiosEdittaller2" class="ListaAgregarAudiosEdittaller">
                  <label class="uploadlabel" for="AgregarAudios2">Agregar Audios o Videos</label>
                  <input class="uploadinput" type="file" onchange="showNextFileUploads(this)" id="AgregarAudios2" name="audio3" value="">
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
              <button type="button" class="EliminarEntrada botonFinal" id="botonELIMINAR" onclick="if(confirm('Quieres borrar esta noticia?'))location.href='/admin/borrar/entrada/${data._id}'">ELIMINAR Entrada</button>
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
