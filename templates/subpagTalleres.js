const template = function(talleres){
    let data = talleres.data
    let lista = ''
    for(let x=0;x<data.length;x++){
      let taller = data[x]
      let img = ''
      let titulo = taller.titulo
      let horario = taller.horario
      let tallerista = taller.tallerista
      let descripcion = taller.descripcion
      if(taller.images[0]){
        img = `<img src="${taller.images[0].url}" alt="${taller.images[0].title}">`
      }
      lista+=`  <li>
            ${img}
          <h3><a href="/taller/${taller._id}">
            ${titulo}
          </a></h3>
          <div class="horario">${horario}
            <div class="tallerista">
            Por ${tallerista}
            </div>
          </div>
          <div class="descripcion">
            ${descripcion}
          </div>
        </li>
      `
    }

    let raw = `
    <!DOCTYPE html>
    <html lang="es" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>APU Talleres</title>
        <link rel="shortcut icon" href="../public/static/logos/APU-icon.png" type="image/png">
        <link rel="stylesheet" href="../public/static/layout.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300&display=swap" rel="stylesheet">
      </head>
      <body>
        <header id="modeloSubpag" class="talleres">
          <div id="pagPresentacion">
            <h1 class="h1modeloSubpag">TALLERES en el APU</h1>
            <input type="checkbox" id="checkboxHamburguesa" onclick="" name="" value="">
            <label for="checkboxHamburguesa" id="menuON">
              <span></span>
              <span></span>
              <span></span>
            </label>
            <label id="botonLogoModeloSubpag" for="checkboxHamburguesa"></label>
            <img id="LogoApuModeloSubpag" src="../public/static/logos/Logo-APU.png" alt="Logo de Apu">
            <nav class="MenuDesplegable MenuDesplegableModeloSubpag">
      				<ul class="MenuDesplegable1">
                <li><a id="inicio" href="/">INICIO</a>
                </li>
      					<li><a id="actividades" href="#actividades">ACTIVIDADES</a>
                  <ul class="submenu">
                    <li><a href="">TALLERES</a></li>
                    <li><a href="">EVENTOS</a></li>
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
            <div class="textoUbicacionModelosubpag">
              <p>Ruta 89 s/n - Las Vegas - Potrerillos<br>Mendoza - ARGENTINA<br>
              Mail: <a href="mailto:apuclubdelmonte@gmail.com">apuclubdelmonte@gmail.com</a><br>
              Tel: <a href="tel:+5492613347020">261-3347020</a></p>
            </div>
            <div class="SocialLink">
              <a class="social-link-fb" href="https://www.facebook.com/apuclubsocialydeportivo" target="_blank" rel="noopener"><img src="../public/static/logos/f_logo_RGB-Black_250.png" alt="enlace a Facebook">
              </a>
              <a class="social-link-in" href="http://www.instagram.com/apuclubdemonte" target="_blank" rel="noopener"><img src="../public/static/logos/glyph-logo_May2016.png" alt="enlace a Instagram">
              </a>
              <a id="subscribe-button" href="mailto:apuclubdelmonte@gmail.com">Asociate</a>
            </div>
            <div class="talleres">
              <ul>
                ${lista}
              </ul>
            </div>
          </div>
        </header>
        <script type="text/javascript" src="../public/static/scripts/sliderModeloJSON.js"></script>
      </body>
    </html>
    `;
    return raw;
}

module.exports = template;
