require('dotenv').config();
const jwt = require('jsonwebtoken');
const { GetUserData } = require('../models/auth');

exports.Authentication = async (req, res, next) => {
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
      status: 'failed',
      message: error.msg || 'Not Authorized',
    });
  }
};

exports.isRoleAdmin = async (req, res, next) => {
  try {
    let role = await GetUserData(req.auth.username);
    role = role[1][0]['role'];
    if (role !== 'superadmin') throw new Error('Not Authorized');
    next();
  } catch (error) {
    console.log('error on auth middleware => ', error);
    res.status(401).send({
      status: 'failed',
      message: error.msg || 'Not Authorized',
    });
  }
};

exports.isRoleSeller = async (req, res, next) => {
  try {
    let role = await GetUserData(req.auth.username);
    role = role[1][0]['role'];
    if (role !== 'seller') throw new Error('Not Authorized');
    next();
  } catch (error) {
    console.log('error on auth middleware => ', error);
    res.status(401).send({
      status: 'failed',
      message: error.msg || 'Not Authorized',
    });
  }
};
