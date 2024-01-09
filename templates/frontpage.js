const template = function(data){

    let listaAgenda=data.articulo1


    let raw = `
    <!DOCTYPE html>
    <html lang="es" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>APU Club de Montaña</title>
        <link rel="shortcut icon" href="public/static/logos/APU-icon.png" type="image/png">
        <link rel="stylesheet" href="public/static/layout.css">
      <!--  <link rel="stylesheet" type="text/css"  href="/public/static/layout.css">-->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <!-- <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> -->
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300&display=swap" rel="stylesheet">
        <!--<script type="module" src="/index.js"></script>-->
      </head>
      <body>
        <header>
          <div id="pagPresentacion">
            <h1>APU Club de Montaña</h1>
            <input type="checkbox" id="checkboxHamburguesa" name="" value="">
            <label for="checkboxHamburguesa" id="menuON">
              <span></span>
              <span></span>
              <span></span>
            </label>
            <label id="botonLogo" for="checkboxHamburguesa"></label>
            <img id="LogoApu" src="public/static/logos/Logo-APU.png" alt="Logo de Apu">
            <nav class="MenuDesplegable">
              <ul class="MenuDesplegable1">
                <li><a id="actividades" href="#actividades">ACTIVIDADES</a>
                  <ul class="submenu">
                    <li><a href="/talleres">TALLERES</a></li>
                    <li><a href="/eventos">EVENTOS</a></li>
                    <li style="display: none;"><a href="/modeloSubpagina">AGENDA</a></li>
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
              <a class="social-link-fb" href="https://www.facebook.com/apuclubsocialydeportivo" target="_blank" rel="noopener"><img src="public/static/logos/f_logo_RGB-Black_250.png" alt="enlace a Facebook">
              </a>
              <a class="social-link-in" href="http://www.instagram.com/apuclubdemonte" target="_blank" rel="noopener"><img src="public/static/logos/glyph-logo_May2016.png" alt="enlace a Instagram">
              </a>
              <a id="subscribe-button" href="https://api.whatsapp.com/send?phone=+5492613347020&text=Hola,+quiero+información+sobre+cómo+colaborar+con+el+APU" target="_blank">Asociate</a>
            </div>
            <div class="proximasActividades">
              <h2>Vení y participá!</h2>
              <ul class="listaActividades">
                <li>
                  <a href="#"><h3>Festival Me Vuelvo al Pueblo<br>(12 al 15 de Octubre)</h3></a>
                  <img src="public/files/foto-de-fondo.png" alt="">
                  <p>Un fin de semana a puro sol y arte.<br>Cine, charlas, música, mates y siestas.</p>
                </li>
                <li>
                  <a href="/cineTerror"><h3>Terror en la Montaña<br>(19 y 20 de Agosto)</h3></a>
                  <img src="public/files/materialParaWebTerror/imgPortada.png" alt="">
                  <p>Presentaremos seis producciones de realizadores mendocinos basadas en el género de terror.<br>
                  Acercate al Club APU y disfrutá del mejor cine!</p>
                </li>
              </ul>
            </div>
            <div class="proyeccionFotos">
                <ul>
                  <li>
                    <img id="foto1" class="opacidad" src="public/files/imgFrontpage/0.jpg" alt="Fotos del Club APU">
                  </li>
                </ul>
            </div>
          </div>
        </header>
      </body>
      <script src="public/static/scripts/marcoCarrusel.js"></script>
      <script type="text/javascript">
      setInterval(1);
      </script>
    </html>
    `;
    return raw;
}

module.exports = template;
