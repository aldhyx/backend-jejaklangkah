const AuthRouter = require('express').Router();
const { SignUp } = require('../controllers/auth');

AuthRouter.post('/signup', SignUp);

module.exports = AuthRouter;
