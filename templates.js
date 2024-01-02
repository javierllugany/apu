const raw = {
  frontpage: require('./templates/frontpage.js'),
  ubicacion: require('./templates/ubicacion.js'),
  cineTerror: require('./templates/cineTerror.js'),
  talleres: require('./templates/subpagTalleres.js'),
  login: require('./templates/login.js'),
  admin: require('./templates/admin.js'),
  listaActividades: require('./templates/listaActividades.js'),
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
