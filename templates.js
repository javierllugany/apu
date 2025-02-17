const raw = {
  frontpage: require('./templates/frontpage.js'),
  ubicacion: require('./templates/ubicacion.js'),
  login: require('./templates/login.js'),
  admin: require('./templates/admin.js'),
  listaActividades: require('./templates/listaActividades.js'),
  subpagActividades: require('./templates/subpagActividades.js'),
  subpagActividad: require('./templates/subpagActividad.js'),
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
