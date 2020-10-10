const UsersRouter = require('express').Router();
const { Authentication, isRoleAdmin } = require('../middleware/auth');
const { validate, Joi } = require('express-validation');

const {
  UpdateUser,
  UpdateUsername,
  UpdatePassword,
  UpdateEmail,
  DeleteUser,
  GetUsers,
  GetUser,
} = require('../controllers/users');

const validationRules = {
  username: {
    body: Joi.object({
      username: Joi.string().trim().required(),
    }),
  },
  password: {
    body: Joi.object({
      password: Joi.string().trim().required(),
      passwordConfirmation: Joi.string().trim().required(),
    }),
  },
  email: {
    body: Joi.object({
      email: Joi.string().trim().required(),
    }),
  },
  id: {
    params: Joi.object({
      id: Joi.number(),
    }),
  },
};

UsersRouter.patch(
  '/:id',
  Authentication,
  validate(validationRules.id, { keyByField: true }, {}),
  UpdateUser
);
UsersRouter.patch(
  '/username/:id',
  Authentication,
  validate(
    { ...validationRules.id, ...validationRules.username },
    { keyByField: true },
    {}
  ),
  UpdateUsername
);
UsersRouter.patch(
  '/password/:id',
  Authentication,
  validate(
    { ...validationRules.id, ...validationRules.password },
    { keyByField: true },
    {}
  ),
  UpdatePassword
);
UsersRouter.patch(
  '/email/:id',
  Authentication,
  validate(
    { ...validationRules.id, ...validationRules.email },
    { keyByField: true },
    {}
  ),
  UpdateEmail
);
UsersRouter.get(
  '/:id',
  Authentication,
  validate(validationRules.id, { keyByField: true }, {}),
  GetUser
);

UsersRouter.get('/', Authentication, isRoleAdmin, GetUsers);
UsersRouter.delete(
  '/:id',
  Authentication,
  isRoleAdmin,
  validate(validationRules.id, { keyByField: true }, {}),
  DeleteUser
);

module.exports = UsersRouter;
