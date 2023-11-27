const template = function(data){

    let listaAgenda=data.articulo1

    let raw = `
    <!DOCTYPE html>
    <html lang="es" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>APU Admin</title>
        <link rel="shortcut icon" href="../public/static/logos/APU-icon.png" type="image/png">
        <link rel="stylesheet" href="../public/static/layout.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300&display=swap" rel="stylesheet">
      </head>
      <body>
        <header id="modeloSubpag">
          <div>
            ${listaAgenda}
          </div>
        </header>
      </body>
    </html>
    `;
    return raw;
}

module.exports = template;
