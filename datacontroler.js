const fs = require('fs');
const Admin = require('./model/admin.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

  ubicacion: async function(){
    let ne2ubicacion="hola ubicacion del datacontroler"
    let newubicacion = {
      articulo10:ne2ubicacion,
      articulo20:"hai mas",
    }
      return newubicacion;
    },

  subpagina: async function(subpagina){
    let ne2Terror="hola ${subpagina} del datacontroler"
    let newTerror = {
      articulo10:ne2Terror,
      articulo20:"hai mas Terror",
    }
      return newTerror;
    },

  iniciarSesionAdmin: async function(password){
    try {
      let validation = await process.env.TOKEN_Admin.compare(password);
      if(!validation){
        console.log('La contraseña no es correcta');
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  },

};

module.exports = datacontroler;
