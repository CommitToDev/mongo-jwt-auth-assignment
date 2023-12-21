const jwt = require('jsonwebtoken')
const jwtPassword = 'user'
function userMiddelwares (req, res, next){
    const Authorization = req.headers['authorization']; 
    if (!Authorization) {
      return res.json("Unauthorized: Token missing");
    }
try{    
    const verify = jwt.verify(Authorization, jwtPassword); 
    if (verify) {
     return   next();
    }else{
       return res.json("Unauthorized: Invalid token");
    }
}catch(error){
    console.error(error);
  return  res.json("Middelware Problem")
}
}
module.exports = userMiddelwares;