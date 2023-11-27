const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const auth = async function(req,res,next){
  console.log('cookies:',req.headers.cookie);
  let cookie = req.headers.cookie;
  if(!cookie || cookie.indexOf('jwt=')==-1){
    //next();
    res.redirect('/login');
    return;
  }
  let token = cookie.substring(cookie.indexOf('jwt=')+'jwt='.length);
  console.log('jwt',token);
  const verified = jwt.verify(token,process.env.TOKEN_Admin2);
  console.log('verified:',verified);
  if(verified){
    req.user=verified;
    next();
  }else{
    res.redirect('/login');
    return;
  }
  return;
};

module.exports = auth; //el codigo esta hecho en módulos, y aca se define que exporte ese modulo para llamarlo desde otro lado
