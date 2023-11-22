const template = function(data){

    let raw = `
    <!DOCTYPE html>
    <html lang="es" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>APU Cine de Terror1</title>
        <link rel="shortcut icon" href="../public/static/logos/APU-icon.png" type="image/png">
        <link rel="stylesheet" href="../public/static/layoutTerror.css">
      </head>
      <body>
        <header id="cicloTerror">
          <div id="presentacion">
            <h1>APU CINE DE TERROR</h1>
            <h2>FESTIVAL DE CINE</h2>
            <div class="marcoPortada">
              <img id="tituloFest" src="/public/files/materialParaWebTerror/Logo-festi.png" alt="Logo del Festival de Terror">
              <div class="portada">
                <img id="fondoPortada" src="../public/files/materialParaWebTerror/imgPortada.jpg" alt="">
              </div>
              <img id="años" src="/public/files/materialParaWebTerror/+18.png" alt="Para Mayores de 18 años">
            </div>
            <div id="fecha">
              <p class="dia">19 Y 20<br>DE AGOSTO</p>
              <p class="hora">19.30</p>
              <p class="hora2">H</p>
            </div>
            <div id="textosApuUbicacion">
              <p class="textoApu">>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;APU - CLUB DE MONTAÑA&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<</p>
              <p class="textoMendoza">Las Vegas | Potrerillos | Mendoza</p>
            </div>
            <p class="portadaTexto">Durante dos días, presentaremos seis producciones de realizadores mendocinos basadas en el género de terror.<br>
               Cada día, proyectaremos tres películas, que incluyen dos cortometrajes, uno de ellos en la sección "Cine Joven", dedicada a directores
               emergentes, seguidos por un largometraje.<br> Les esperamos para explorar lo desconocido, celebrar la creatividad de nuestros realizadores
               y compartir un espacio de arte y cultura en la montaña!</p>
            <div class="seccionReserva">
              <p class="textoReserva">se ruega<br>puntualidad</p>
              <div class="cajaReserva">
                <a class="reserva" href="https://api.whatsapp.com/send?phone=+5492613347020&text=Hola,+quiero+más+información+del+Ciclo+de+Terror">informes
                  <img class="logoWhatsApp"src="/public/files/materialParaWebTerror/whatsapp.png" alt="por WhatsApp"></a>
              </div>
            </div>
          </div>
          <div id="pag1">
            <h3 class="carteles">PROGRAMACION</h3>
            <div class="programa1">
              <p class="programa1A">DÍA</p>
              <p class="programa1AA">1</p>
              <p class="programa1B">SABADO<br>19 DE AGOSTO</p>
            </div>
            <div class="pelicula">
              <img class="portadaPelicula" src="/public/files/materialParaWebTerror/ocupado.jpeg" alt="Portada film Ocupado">
              <div class="textoPelicula">
                <p class="genero">CINE JOVEN</p>
                <p class="tituloPelicula">OCUPADO</p>
                <p class="sinopsis">Como de costumbre, algo huele mal en el baño de la escuela. Santiago ya está acostumbrado a pasar tiempo allí para evitar sus clases, pero su tranquilidad se verá alterada cuando un misterioso estudiante ocupa el cubículo de al lado.</p>
              </div>
              <div class="fichaPelicula">
                <p class="director">DIRECTOR:</p>
                <p class="nombreDirector">Giuliano Bagorda</p>
                <p class="duracion">DURACION:</p>
                <p class="tiempoDuracion">8 min 46 seg</p>
              </div>
            </div>
            <hr>
            <div class="pelicula">
              <img class="portadaPelicula" src="/public/files/materialParaWebTerror/chanchis01.jpg" alt="Portada film Chanchis">
              <div class="textoPelicula">
                <p class="genero">CORTOMETRAJE</p>
                <p class="tituloPelicula">CHANCHIS</p>
                <p class="sinopsis">Una relación que se vuelve enferma hace que sus integrantes se vuelvan monstruos.</p>
              </div>
              <div class="fichaPelicula">
                <p class="director">DIRECTOR:</p>
                <p class="nombreDirector">Lautaro Maldonado</p>
                <p class="duracion">DURACION:</p>
                <p class="tiempoDuracion">9 min</p>
              </div>
            </div>
            <hr>
            <div class="pelicula">
              <img class="portadaPelicula" src="/public/files/materialParaWebTerror/akelarre-950382256-large.jpg" alt="Portada film Akelarre">
              <div class="textoPelicula">
                <p class="genero">LARGOMETRAJE</p>
                <p class="tituloPelicula">AKELARRE</p>
                <p class="sinopsis">En 1609 en las provincias vascas un quinteto de muchachas son arrestadas por la Inquisición bajo el cargo de brujería debido a los rumores y avistamientos sobre la actividad de las jóvenes en el bosque a altas horas de la noche. La unión del grupo de mujeres acusadas será la clave de la defensa de sus derechos.</p>
              </div>
              <div class="fichaPelicula">
                <p class="director">DIRECTOR:</p>
                <p class="nombreDirector">Pablo Agüero</p>
                <p class="duracion">DURACION:</p>
                <p class="tiempoDuracion">91 min</p>
              </div>
            </div>
          </div>
          <div id="pagIntermedia">
            <div class="programa1">
              <p class="programa1A">DÍA</p>
              <p class="programa1AA">2</p>
              <p class="programa1B">DOMINGO<br>20 DE AGOSTO</p>
            </div>
          </div>
          <div id="pag2">
            <div class="pelicula">
              <img class="portadaPelicula" src="/public/files/materialParaWebTerror/laMujerPerdida.jpg" alt="Portada film La Mujer Perdida">
              <div class="textoPelicula">
                <p class="genero">CINE JOVEN</p>
                <p class="tituloPelicula">LA MUJER PERDIDA</p>
                <p class="sinopsis">Lucia y Gabi son una pareja que está pasando un momento tenso en su relación. Es entonces que deciden pasar un finde en la casa de vacaciones de Gabi, donde ambos terminarán encontrando un trágico final a su relación.</p>
              </div>
              <div class="fichaPelicula">
                <p class="director">DIRECTOR:</p>
                <p class="nombreDirector">Ivan Ramos</p>
                <p class="duracion">DURACION:</p>
                <p class="tiempoDuracion">6 min 32 seg</p>
              </div>
            </div>
            <hr>
            <div class="pelicula">
              <img class="portadaPelicula" src="/public/files/materialParaWebTerror/brulefer.jpg" alt="Portada film Brulefer">
              <div class="textoPelicula">
                <p class="genero">CORTOMETRAJE</p>
                <p class="tituloPelicula">BRULEFER</p>
                <p class="sinopsis">Una hechicera realiza un ritual para que su hija pueda recuperar rápidamente su salud visual, pero durante el proceso comete un grave error, que pondrá su propia vida en peligro.</p>
              </div>
              <div class="fichaPelicula">
                <p class="director">DIRECTOR:</p>
                <p class="nombreDirector">Martín de la Cruz</p>
                <p class="duracion">DURACION:</p>
                <p class="tiempoDuracion">10 min</p>
              </div>
            </div>
            <hr>
            <div class="pelicula">
              <img class="portadaPelicula" src="/public/files/materialParaWebTerror/muere-monstruo.png" alt="Portada film Muere Monstruo Muere">
              <div class="textoPelicula">
                <p class="genero">LARGOMETRAJE</p>
                <p class="tituloPelicula">MUERE MONSTRUO MUERE</p>
                <p class="sinopsis">En una zona un tanto alejada de la Cordillera de los Andes, encuentran el cuerpo cercenado de una mujer. Cruz, un oficial de la policía rural, se hace cargo de la investigación. David, esposo de Francisca quien a su vez es la amante de Cruz, se convierte rápidamente en el principal sospechoso. Cuando lo internan a David en un hospital psiquiátrico, culpa de lo sucedido a un monstruo que se le aparece repentina e inexplicablemente.</p>
              </div>
              <div class="fichaPelicula">
                <p class="director">DIRECTOR:</p>
                <p class="nombreDirector">Alejandro Fadel</p>
                <p class="duracion">DURACION:</p>
                <p class="tiempoDuracion">109 min</p>
              </div>
            </div>
          </div>
          <div id="ubicacion">
            <h3 class="carteles">CÓMO LLEGAR</h3>
            <iframe class="mapaMediano" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d214110.72537794744!2d-69.53744888305664!3d-33.01748018770446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967deb64c38e7955%3A0x95f8a56ba326cc7d!2sAPU%20CLUB%20DE%20MONTA%C3%91A!5e0!3m2!1ses-419!2ses!4v1654770682182!5m2!1ses-419!2ses" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <iframe class="mapaChico" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3345.479773075291!2d-69.27597878446946!3d-33.017488382808594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967deb64c38e7955%3A0x95f8a56ba326cc7d!2sAPU%20CLUB%20DE%20MONTA%C3%91A!5e0!3m2!1ses-419!2ses!4v1655377239226!5m2!1ses-419!2ses" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <div class="seccionReserva">
              <p class="textoReserva">se ruega<br>puntualidad</p>
              <div class="cajaReserva">
                <a class="reserva" href="https://api.whatsapp.com/send?phone=+5492613347020&text=Hola,+quiero+más+información+del+Ciclo+de+Terror">informes
                  <img class="logoWhatsApp"src="/public/files/materialParaWebTerror/whatsapp.png" alt="por WhatsApp"></a>
              </div>
            </div>
            <div class="creditos">
              <p class="invitan">invitan</p>
              <p class="apoyo">con el apoyo del</p>
              <img class="logoVereda" src="/public/files/materialParaWebTerror/vereda.png" alt="Logo de La Vereda Alta">
              <img class="logoClubApu" src="/public/files/materialParaWebTerror/apu.png" alt="Logo del Club APU">
              <img class="logoGobierno" src="/public/files/materialParaWebTerror/incaa.png" alt="Logo del INCAA">
            </div>
          </div>
        </header>
      </body>
    </html>
    `;
    return raw;
}

module.exports = template;
