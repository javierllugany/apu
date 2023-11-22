const raw = {
  frontpage: require('./templates/frontpage.js'),
  ubicacion: require('./templates/ubicacion.js'),
  cineTerror: require('./templates/cineTerror.js'),
  modeloSubpagina: require('./templates/modeloSubpagina.js'),
  form:{
      admin: require('./templates/admin.js'),
      actividad: require('./templates/actividad.js'),
      },
}

const templates = {
  buildPage: function(pagename,data){
    if(raw[pagename]) return raw[pagename](data)
  },
  buildError: function(nr){
    return 'oops, something went wrong del template';
  },
};

module.exports = templates;
