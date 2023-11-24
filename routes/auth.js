const authPassword = async function(req,res,next){
    let contraseña=await prompt("Contraseña");
    if (contraseña===process.env.TOKEN_SECRET) {
      req.user=verified;
      next();
    }else{
      res.redirect('/');
      return;
    }
}

module.exports = auth; //el codigo esta hecho en módulos, y aca se define que exporte ese modulo para llamarlo desde otro lado
