const AuthRouter = require('express').Router();
const { SignUp, Login } = require('../controllers/auth');
const { validate, Joi } = require('express-validation');

const signUpValidation = {
  body: Joi.object({
    role: Joi.string().valid('user', 'seller').required(),
    email: Joi.string().email().trim().required(),
    username: Joi.string().trim().required(),
    firstname: Joi.string().trim().required(),
    lastname: Joi.string().trim().required(),
    gender: Joi.string().valid('male', 'female').required(),
    birthday: Joi.date().required(),
    password: Joi.string().required(),
  }),
};

const loginValidation = {
  body: Joi.object({
    username: Joi.string().trim().required(),
    password: Joi.string().required(),
  }),
};

AuthRouter.post(
  '/signup',
  validate(signUpValidation, { keyByField: true }, {}),
  SignUp
);
AuthRouter.post(
  '/login',
  validate(loginValidation, { keyByField: true }, {}),
  Login
);

module.exports = AuthRouter;
