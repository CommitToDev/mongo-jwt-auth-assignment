const jwt = require('jsonwebtoken');
const jwtPassword = 'user';

function userMiddleware(req, res, next) {
    const authorization = req.headers['authorization']; 
    if (!authorization) {
        return res.status(401).json({ error: 'Unauthorized: Token missing' });
    }

    try {    
        const verify = jwt.verify(authorization, jwtPassword); 
      if(verify){ 
        const decode = jwt.decode(authorization)
        req.decode = decode
         next();
    }
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.json({ error: 'Unauthorized: Invalid token' });
        } else if (error.name === 'TokenExpiredError') {
            return res.json({ error: 'Unauthorized: Token expired' });
        } else {
            console.error(error);
            return res.json({ error: 'Middleware Problem' });
        }
    }
}

module.exports = userMiddleware;
