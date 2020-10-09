require('dotenv').config();
const jwt = require('jsonwebtoken');

async function Authentication(req, res, next) {
  try {
    let token = req.headers.authorization || '';

    if (!token) throw new Error('Not Authorized');
    token = token.replace(/Bearer\s*/, '');

    const payload = jwt.verify(token, process.env.JWT_KEY); //auto throw error if false
    req.auth = payload;
    next();
  } catch (error) {
    console.log('error on auth middleware => ', error);
    res.status(401).send({
      msg: error || 'Not Authorized',
    });
  }
}

module.exports = Authentication;
