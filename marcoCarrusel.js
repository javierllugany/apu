let fotosMarco1=new Array(
       'public/files/imgFrontpage/0.jpg',
       'public/files/imgFrontpage/1.jpg',
        'public/files/imgFrontpage/2.jpg',
        'public/files/imgFrontpage/3.jpg',
        'public/files/imgFrontpage/4.jpg',
        'public/files/imgFrontpage/5.jpg',
         'public/files/imgFrontpage/6.jpg',
         'public/files/imgFrontpage/7.jpg',
         'public/files/imgFrontpage/8.jpg',
         'public/files/imgFrontpage/9.jpg',
);

let fotosMarco2=new Array(
        'public/files/imgFrontpage/10.jpg',
        'public/files/imgFrontpage/11.jpg',
         'public/files/imgFrontpage/12.jpg',
         'public/files/imgFrontpage/13.jpg',
         'public/files/imgFrontpage/14.jpg',
         'public/files/imgFrontpage/15.jpg',
          'public/files/imgFrontpage/16.jpg',
          'public/files/imgFrontpage/17.jpg',
          'public/files/imgFrontpage/18.jpg',
          'public/files/imgFrontpage/19.jpg',
);

let fotosMarco3=new Array(
        'public/files/imgFrontpage/20.jpg',
        'public/files/imgFrontpage/21.jpg',
         'public/files/imgFrontpage/22.jpg',
         'public/files/imgFrontpage/23.jpg',
         'public/files/imgFrontpage/24.jpg',
         'public/files/imgFrontpage/25.jpg',
          'public/files/imgFrontpage/26.jpg',
          'public/files/imgFrontpage/27.jpg',
          'public/files/imgFrontpage/28.jpg',
          'public/files/imgFrontpage/29.jpg',
);

var x=0;

var y=0;

var z=0;

setInterval(function () {

// cambiamos la imagen de manera sucesiva en foto2 y de manera aleatoria en foto1 y foto3
let random1=Math.floor(Math.random() * fotosMarco1.length);

let random3=Math.floor(Math.random() * fotosMarco3.length);

      const imagen1 = document.getElementById("foto1");
          imagen1.style.opacity = "0";
      const imagen2 = document.getElementById("foto2");
          imagen2.style.opacity = "0";
      const imagen3 = document.getElementById("foto3");
          imagen3.style.opacity = "0";
      setTimeout(() => {
        document.getElementById("foto1").src=fotosMarco1[random1];
        document.getElementById("foto2").src=fotosMarco2[y++%fotosMarco2.length];
        document.getElementById("foto3").src=fotosMarco3[random3];
        imagen1.style.opacity = "1";
        imagen2.style.opacity = "1";
        imagen3.style.opacity = "1";
      }, 1000);

},5000);
