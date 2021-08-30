const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

function validate(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) 
    return res.status(401).send({ error: 'No token provived' });

  const parts = authorization.split(' ');

  if (!parts.length === 2) 
    return res.status(401).send({ error: 'token error' });
  
  const [scheme, token] = parts;

  if(!/^Bearer$/i.test(scheme)) 
    return res.status(401).send({ error: 'Token malformatted' });

  jwt.verify(token, authConfig.secret, (error, decoded) =>{
    if(error) return res.status(401).send({ error: 'Token invalid' });

    req.userId = decoded.id;
    return next();
  });  
}

module.exports = validate;