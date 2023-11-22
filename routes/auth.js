const jwt = require('jsonwebtoken');

const admin = {
  password: '',
};

const token = jwt.sign(admin, process.env.TOKENadmin_SECRET, { expiresIn: '1h' });

let password = "";

admin.password=async function(){
    let contraseña=await prompt("Contraseña");
    admin.password=contraseña;
    return admin;
}


const auth = async function(req,res,next){

  // console.log('cookies:',req.headers.cookie);
  let cookie = req.headers.cookie;
  if(!cookie || cookie.indexOf('jwt=')==-1){
    //next();
    res.redirect('/iniciar');
    return;
  }
  let token = cookie.substring(cookie.indexOf('jwt=')+'jwt='.length);
  // console.log('jwt',token);
  const verified = jwt.verify(token,process.env.TOKEN_SECRET);
  console.log('verified:',verified);
  if(verified){
    req.user=verified;
    next();
  }else{
    res.redirect('/iniciar');
    return;
  }

  return;
}

module.exports = auth; //el codigo esta hecho en módulos, y aca se define que exporte ese modulo para llamarlo desde otro lado
