const fs = require('fs');

const datacontroler = {
  frontpage: async function(){
    //exporta un objeto que contiene todos datos para frontpage
    // if(this.cache.frontpage)return this.cache.frontpage;
    let agenda1="hola agenda1 del datacontroler"
    let agenda2="Chau agenda2 del datacontroler"

      let newfrontpage = {
        articulo1:agenda1,
        articulo2:agenda2,
      }
      return newfrontpage;
    },

    admin: async function(){
      //exporta un objeto que contiene todos datos para frontpage
      // if(this.cache.frontpage)return this.cache.frontpage;
      let agenda1="hola adminRoute1 del datacontroler"
      let agenda2="Chau adminRoute2 del datacontroler"

        let newfrontpage = {
          articulo1:agenda1,
          articulo2:agenda2,
        }
        return newfrontpage;
      },

  subpagina: async function(subpagina){
    let ne2Terror="hola ${subpagina} automatica del datacontroler"
    let newTerror = {
      articulo1:ne2Terror,
      articulo20:"hai mas Terror",
    }
      return newTerror;
    },

};

module.exports = datacontroler;
