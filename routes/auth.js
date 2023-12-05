//const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const auth = async function(req,res,next){
  //console.log('cookies:',req.headers.cookie);
  let cookie = req.headers.cookie;
  if(!cookie || cookie.indexOf('jwt=')==-1){
    //next();
    res.redirect('/loginAdmin');
    return;
  }
  let token = cookie.substring(cookie.indexOf('jwt=')+'jwt='.length);
  //console.log('jwt',token);
  // const verified = jwt.verify(token,"true");
  // console.log('verified:',verified);
  if(token==="true"){
    //req.user=verified;
    //console.log("pasamos el token true de routes/auth.js");
    next();
  }else{
    res.redirect('/loginAdmin');
    return;
  }
  return;
};

module.exports = auth; //el codigo esta hecho en módulos, y aca se define que exporte ese modulo para llamarlo desde otro lado
