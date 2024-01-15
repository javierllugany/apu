const template = function(dataActividad){
  console.log('linea 2 subpagActividad dataActividad es: ', dataActividad);
  let actividad = dataActividad.data
  let tipo = actividad.tipo
  let titulo = actividad.titulo
  let fechaInicio = actividad.fechaInicio
  let programa = actividad.programa
  let lugar=actividad.lugar
  let descripcion=actividad.descripcion
  let tallerista=actividad.tallerista
  let organiza=actividad.organiza
  let videolink=actividad.videolink.url
  let divTallerista=''
  if(dataActividad.data.tipo==="Taller"){
    divTallerista = `<div class="tallerista">Tallerista: ${tallerista}</div>`;
  }
  let imgPrincipal='';
  if(dataActividad.data.fotos[0]){
    imgPrincipal = `<img src="${dataActividad.data.fotos[0].url}" alt="${titulo}">`;
  }
  let divVideoLink=''
  if(dataActividad.data.videolink.url){
    divVideoLink = `<div class="linkYoutube"><a href="${videolink}" target="_blank">${videolink}</a></div>`;
  }
  let divfotos=[]
  for(let x=1;x<dataActividad.data.fotos.length;x++){
    let foto = dataActividad.data.fotos[x]
  //  listafotos.push(foto)
    divfotos+= `  <li>
                      <img src="${foto.url}">
                    </li>`;
    };
    let lista=`<div class="datosActividad">
                  ${imgPrincipal}
                  <div class="informacionActividad">
                      <h3 class="tipoActividad">${tipo}</h3>
                      <h2 class="tituloActividad">${titulo}</h2>
                      <div class="fechaInicio">Fecha de Inicio: ${fechaInicio}</div>
                      <div class="programa">${programa}</div>
                      <div class="lugar">Lugar: ${lugar}</div>
                      ${divTallerista}
                      <div class="organiza">Organiza: ${organiza}</div>
                      ${divVideoLink}
                  </div>
                  <div class="descripcion">${descripcion}</div>
                  <ul class="listafotos">
                    ${divfotos}
                  </ul>
            </div>
  `;

    let raw = `
    <!DOCTYPE html>
    <html lang="es" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>${titulo}</title>
        <link rel="shortcut icon" href="../public/static/logos/APU-icon.png" type="image/png">
        <link rel="stylesheet" href="../public/static/layout.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300&display=swap" rel="stylesheet">
      </head>
      <body>
        <header class="pagUbicacion">
          <div id="pagPresentacion">
            <h1>APU ${titulo}</h1>
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
            <div class="listaUnaActividad">
                ${lista}
            </div>
          </div>
        </header>
      </body>
    </html>
    `;
    return raw;
}

module.exports = template;
