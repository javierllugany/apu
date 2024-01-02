const template = function(actividades){
    let lista = ''
    actividades.sort((a, b) => new Date(b.fechaInicio) - new Date(a.fechaInicio));
    for(let x=0;x<actividades.length;x++){
      let actividad = actividades[x]
      let titulo = actividad.titulo
      let tipo = actividad.tipo
      let fechaInicio = actividad.fechaInicio
      let programa = actividad.programa
      let descripcion = actividad.descripcion.substring(0,actividad.descripcion.indexOf(' ',100))+'...'
      let img=''
      if(actividad.fotos[0]){
        img = `<img src="${actividad.fotos[0].url}" alt="${actividad.fotos[0].title}">`
      }
      lista+=`<li>
                ${img}
                <div class="datos">
                  <div class="tipo">${tipo}</div>
                  <h3><a href="/admin/${actividad.id}">
                    ${titulo}</a></h3>
                  <div class="fecha">${fechaInicio}</div>
                  <div class="programa">${programa}</div>
                  <div class="descripcion">${descripcion}</div>
                </div>
              </li>
      `
    }
    let raw = `
    <!DOCTYPE html>
    <html lang="es" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>APU Actividades</title>
        <link rel="shortcut icon" href="../public/static/logos/APU-icon.png" type="image/png">
        <link rel="stylesheet" href="../public/static/layout.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300&display=swap" rel="stylesheet">
      </head>
      <body>
        <header class="modeloSubpag admin">
          <div id="pagAdmin">
            <h1>APU Club de Montaña</h1>
            <h2 class="admin">APU - Lista de ACTIVIDADES</h2>
            <div class="topMenu admin">
              <ul>
                <li><a href="/loginAdmin/logout">Cerrar Sesión</a></li>
                <li><a href="/admin">Subir Nueva Entrada</a></li>
              </ul>
            </div>
            <div class="listaTodasLasActividades">
              <ul>
                ${lista}
              </ul>
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

module.exports = template;
