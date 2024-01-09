const template = function(dataActividades){
  console.log('linea 2 subpagTalleres dataActividades es: ', dataActividades);
  let lista = ''
  let h2nuevo='';
  let pestañaTitulo='';
  console.log('linea 8 subpagTalleres dataActividades.data[0].tipo es: ', dataActividades.data[0].tipo);
  if (dataActividades.data[0].tipo==='Taller') {
    h2nuevo='APU - LISTA de TALLERES';
    pestañaTitulo='APU Talleres';
  } else {
    h2nuevo='APU - LISTA de EVENTOS';
    pestañaTitulo='APU Eventos';
  }
  dataActividades.data.sort((a, b) => new Date(b.fechaInicio) - new Date(a.fechaInicio));
  for(let x=0;x<dataActividades.data.length;x++){
    let actividad = dataActividades.data[x]
    let titulo = actividad.titulo
    let tipo = actividad.tipo
    let fechaInicio = actividad.fechaInicio
    let programa = actividad.programa
    let descripcion=''
    if (actividad.descripcion.length>100) {
      descripcion = actividad.descripcion.substring(0,actividad.descripcion.indexOf('',100))+'...';
    } else {
      descripcion = actividad.descripcion;
    }
    let img=''
    if(actividad.fotos[0]){
      img = `<img src="${actividad.fotos[0].url}" alt="${actividad.fotos[0].title}">`
    }
    lista+=`<li>
              ${img}
              <div class="datos">
                <div class="tipo">${tipo}</div>
                <h3><a href="/actividad/${actividad.id}">
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
        <title>${pestañaTitulo}</title>
        <link rel="shortcut icon" href="../public/static/logos/APU-icon.png" type="image/png">
        <link rel="stylesheet" href="../public/static/layout.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300&display=swap" rel="stylesheet">
      </head>
      <body>
        <header class="pagUbicacion">
          <div id="pagPresentacion">
            <h1>APU LISTA DE TALLERES</h1>
            <input type="checkbox" id="checkboxHamburguesa" onclick="" name="" value="">
            <label for="checkboxHamburguesa" id="menuON">
              <span></span>
              <span></span>
              <span></span>
            </label>
            <label id="botonLogo" class="botonLogoUbi" for="checkboxHamburguesa"></label>
            <img id="LogoApu" src="../public/static/logos/Logo-APU.png" alt="Logo de Apu">
            <nav class="MenuDesplegable">
              <ul class="MenuDesplegable1">
                <li><a id="inicio" href="/">INICIO</a>
                </li>
                <li><a id="actividades" href="#actividades">ACTIVIDADES</a>
                  <ul class="submenu">
                    <li><a href="/talleres">TALLERES</a></li>
                    <li><a href="/eventos">EVENTOS</a></li>
                    <li style="display: none;"><a href="">AGENDA</a></li>
                  </ul>
                </li>
                <li style="display: none;"><a id="contenidos" href="#contenidos">CONTENIDOS</a>
                  <ul class="submenu">
                    <li><a href="">YOUTUBE</a></li>
                    <li><a href="">PODSCATS</a></li>
                  </ul>
                </li>
                <li style="display: none;"><a id="quienes" href="#quienes">QUIENES SOMOS</a>
                  <ul class="submenu">
                    <li><a href="">HISTORIA</a></li>
                    <li><a href="">ASOCIACION</a></li>
                    <li><a href="">COMO CONTRIBUIR</a></li>
                  </ul>
                </li>
                <li><a id="contacto" href="/ubicacion">CONTACTO<br>UBICACION</a>
                </li>
              </ul>
            </nav>
            <div class="SocialLink">
              <a class="social-link-fb" href="https://www.facebook.com/apuclubsocialydeportivo" target="_blank" rel="noopener"><img src="../public/static/logos/f_logo_RGB-Black_250.png" alt="enlace a Facebook">
              </a>
              <a class="social-link-in" href="http://www.instagram.com/apuclubdemonte" target="_blank" rel="noopener"><img src="../public/static/logos/glyph-logo_May2016.png" alt="enlace a Instagram">
              </a>
              <a id="subscribe-button" href="https://api.whatsapp.com/send?phone=+5492613347020&text=Hola,+quiero+información+sobre+cómo+colaborar+con+el+APU" target="_blank">Asociate</a>
            </div>
            <div class="listaTodasLasActividades contenidoUsuarios">
              <h2 class="admin">${h2nuevo}</h2>
              <ul>
                ${lista}
              </ul>
            </div>
          </div>
        </header>
      </body>
    </html>
    `;
    return raw;
}

module.exports = template;
