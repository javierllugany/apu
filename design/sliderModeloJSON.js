// const header=document.querySelector("header");
// console.log("america");
// const requestURL = 'https://drive.google.com/uc?id=1T0x2Db0sDWr6cTc8RYmYrLSEmpNNYcWCexport=download'; //se debe almacenar la URL del JSON que se quiere recuperar en una variable
// //const requestURL = ./json/datosFotosAPU.json;
// const request = new XMLHttpRequest(); //Para crear una solicitud, se necesita crear una nueva instancia de objeto de solicitud desde el constructor XMLHttpRequest, utilizando la palabra clave new
// request.open('GET', requestURL); //es necesario abrir una nueva solicitud utilizando el método open(). Esto requiere al menos dos parámetros: El método HTTP a usar cuando se hace una solicitud en red. En este caso GET es adecuado, dado que sólo se estan recuperando algunos datos simples. Y La URL a la que se realiza la solicitud — esta es la URL del archivo que se almacenó antes.
// request.responseType = 'json'; //de esta forma ese XHR sabe que el servidor estará retornando JSON y que esto debería ser convertido en segundo plano en un objeto JavaScript.
// request.send();//Entonces se envía la solicitud con el método send()
// //ahora viene la espera por la respuesta a retornar desde el servidor y luego, manejarla.

// const jsonData= require('./datosFotosAPU.json');
// console.log(jsonData);

// let jsondata=fetch("./datosFotosAPU.json")
// .then(response => {
//    return response.json();
// })
// .then(jsondata => console.log(jsondata));
//
// const jsonData= require('./datosFotosAPU.json');
// console.log("holis!!!");
// console.log(jsonData);


fetch("datosFotosAPU.json")
.then(response => {
   return response.json();
})
.then(jsondata => console.log(jsondata));

console.log("holis!!!");


async function listaDeFotos(){
  console.log("empieza!!!");
  // let response = await fetch('./datosFotosAPU.json')
  // let dataobj
  // if(response.ok){
  //   dataobj = await response.json()
  //   console.log(dataobj);
  // }else{
  //   console.log('could not fetch');
  //   return
  // }
  // let node = document.getElementById('sliderModelo')
  // if(!node)return
  // for(let x=0;x<dataobj.length;x++){
  //    let datalist =  dataobj[x[folder]]
  //    console.log(datalist);
  //    //let name = names[x].toUpperCase()
  //    let imgfotos = document.createElement('img')
  //    node.appendChild(imgfotos)
}
  //weathercarusel()
console.log("HOLA slider!!");
this.listaDeFotos()

//
// request.onload = function() {
//   const fotosAPU = request.response;//En este punto se está almacenando la respuesta a la solicitud (disponible en la propiedad response) en una variable. Esta variable ahora contendrá el objeto JavaScript basado en el JSON.
//   sliderFotos(fotosAPU);
//   listFiles();
// }

//Se han obtenido los datos desde el JSON y convertidos en un objeto de JavaScript. Ahora, se utilizarán estos datos escribiendo las dos funciones que fueron referenciadas
//
// function sliderFotos(jsonObj) {
//   const marcoSlider = document.getElementById('sliderModelo');
//   const linkFoto=document.createElement("p");
//   linkFoto.textContent = jsonObj['Folder'];
//   marcoSlider.appendChild(linkFoto);
//   console.log("hola sliderfotos");
// }
//
// async function listFiles() {
//   //const drive = google.drive({version: 'v3', auth: authClient});
//   const res = await drive.files.list({
//     pageSize: 10,
//     fields: 'nextPageToken, files(id, name)',
//   });
//   const files = res.data.files;
//   if (files.length === 0) {
//     console.log('No files found.');
//     return;
//   }
//
//   console.log('Files:');
//   files.map((file) => {
//     console.log(`${file.name} (${file.id})`);
//   });
//   console.log("Hello!!");
// }
//



//
// let consultaFotosDrive: async function(){
//     let resp = await fetch('/app/redes') //aca no entiendo donde está '/app/redes'
//     if(resp.ok){
//       let red = await resp.json()
//       this.redes = red
//       this.redActual = this.redes[0]
//       this.cambiaRadioAId(0)
//     },
//
// carpetaFotos=function(){
//   for (var i = 0; i < array.length; i++) {
//     array[i]
// "https://drive.google.com/drive/folders/1dAVkHWFwsDu9epV00W2raiQyQTYjsK7C?usp=share_link"
// "https://drive.google.com/file/d/1U57IXPCrvNs5-aZJhH1o1zCOcMqSl_Cn/view?usp=share_link"
//   }
// }
//
// var y=0;
// setInterval(function(){
//       const imagen1 = document.getElementById("foto1");
//         imagen1.style.opacity = "0";
//
//       setTimeout(() => {
//         document.getElementById("foto1").src=fotosMarco1[y++%fotosMarco1.length];
//         imagen1.style.opacity = "1";
//       }, 700);
//     },5000);
